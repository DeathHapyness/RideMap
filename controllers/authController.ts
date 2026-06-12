import bcrypt from 'bcrypt';
import crypto from 'crypto';
import type { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import { sendPasswordResetEmail } from '../services/emailService';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
const nomeRegex = /^[a-záàâãéèêíïóôõöúçñ\s]{3,50}$/i;
const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

class AuthController {
  home = (_req: any, res: any) => {
    res.render('home', { title: 'RideMap' });
  };

  loginPage = (req: any, res: any) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.redirect('/');
  };

  registerPage = (req: any, res: any) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('home', { title: 'Registro - RideMap', showRegisterModal: true });
  };

  login = async (req: any, res: any, next: any) => {
    try {
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      const user = await userModel.findByEmail(req.body.email);
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      const match = await bcrypt.compare(req.body.senha, user.senha);
      if (!match) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }

      req.session.user = {
        id: user.id,
        nome: user.nome,
        email: user.email,
        avatar: user.avatar_url,
        role: user.role
      };

      return res.json(req.session.user);
    } catch (error) {
      next(error);
    }
  };

  register = async (req: any, res: any, next: any) => {
    try {
      const { nome, email, senha } = req.body;

      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido, tente novamente por favor' });
      }

      if (!nomeRegex.test(nome)) {
        return res.status(400).json({ error: 'Nome deve ter 3-50 caracteres (apenas letras)' });
      }

      if (!senhaRegex.test(senha)) {
        return res.status(400).json({
          error: 'Senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número'
        });
      }

      const existingUser = await userModel.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const hash = await bcrypt.hash(senha, 15);
      await userModel.create({ nome, email, senha: hash });
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  logout = (req: any, res: any) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  };

  forgotPassword = async (req: any, res: any, next: any) => {
    try {
      const { email } = req.body;

      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      const user = await userModel.findByEmail(email);
      if (!user) {
        return res.json({
          success: true,
          message: 'Email enviado, você receberá instruções de como recuperar sua senha.'
        });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiration = new Date(Date.now() + 3600000);
      await userModel.savePasswordReset(email, token, expiration);
      await sendPasswordResetEmail(email, token);

      return res.json({
        success: true,
        message: 'Email enviado! Verifique sua caixa de entrada.'
      });
    } catch (error) {
      next(error);
    }
  };

  dashboard = (req: any, res: any) => {
    res.render('dashboard', {
      title: 'Dashboard - RideMap',
      isDashboard: true,
      user: {
        ...req.session.user,
        isAdmin: req.session.user.role === 'admin'
      }
    });
  };

  updateAvatar = async (req: any, res: any, next: any) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, error: 'Arquivo não enviado' });
      }

      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      await userModel.updateAvatar(req.session.user.id, avatarUrl);
      req.session.user.avatar = avatarUrl;

      return res.json({ success: true, avatar_url: avatarUrl });
    } catch (error) {
      next(error);
    }
  };

  updateProfile = async (req: any, res: any, next: any) => {
    try {
      const novoNome = req.body.nome;
      if (!nomeRegex.test(novoNome)) {
        return res.status(400).json({ error: 'Nome deve ter 3-50 caracteres (apenas letras)' });
      }

      await userModel.updateProfile(req.session.user.id, novoNome);
      req.session.user.nome = novoNome;

      return res.json({ success: true, nome: novoNome });
    } catch (error) {
      next(error);
    }
  };
}

export default new AuthController();
