"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../models/userModel"));
const emailService_1 = require("../services/emailService");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
const nomeRegex = /^[a-záàâãéèêíïóôõöúçñ\s]{3,50}$/i;
const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
class AuthController {
    constructor() {
        this.home = (_req, res) => {
            res.render('home', { title: 'RideMap' });
        };
        this.loginPage = (req, res) => {
            if (req.session.user)
                return res.redirect('/dashboard');
            res.redirect('/');
        };
        this.registerPage = (req, res) => {
            if (req.session.user)
                return res.redirect('/dashboard');
            res.render('home', { title: 'Registro - RideMap', showRegisterModal: true });
        };
        this.login = async (req, res, next) => {
            try {
                if (!emailRegex.test(req.body.email)) {
                    return res.status(400).json({ error: 'Email inválido' });
                }
                const user = await userModel_1.default.findByEmail(req.body.email);
                if (!user) {
                    return res.status(401).json({ error: 'Usuário não encontrado' });
                }
                const match = await bcrypt_1.default.compare(req.body.senha, user.senha);
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
            }
            catch (error) {
                next(error);
            }
        };
        this.register = async (req, res, next) => {
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
                const existingUser = await userModel_1.default.findByEmail(email);
                if (existingUser) {
                    return res.status(400).json({ error: 'Email já cadastrado' });
                }
                const hash = await bcrypt_1.default.hash(senha, 15);
                await userModel_1.default.create({ nome, email, senha: hash });
                return res.json({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.logout = (req, res) => {
            req.session.destroy(() => {
                res.redirect('/');
            });
        };
        this.forgotPassword = async (req, res, next) => {
            try {
                const { email } = req.body;
                if (!emailRegex.test(email)) {
                    return res.status(400).json({ error: 'Email inválido' });
                }
                const user = await userModel_1.default.findByEmail(email);
                if (!user) {
                    return res.json({
                        success: true,
                        message: 'Email enviado, você receberá instruções de como recuperar sua senha.'
                    });
                }
                const token = crypto_1.default.randomBytes(32).toString('hex');
                const expiration = new Date(Date.now() + 3600000);
                await userModel_1.default.savePasswordReset(email, token, expiration);
                await (0, emailService_1.sendPasswordResetEmail)(email, token);
                return res.json({
                    success: true,
                    message: 'Email enviado! Verifique sua caixa de entrada.'
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.dashboard = (req, res) => {
            res.render('dashboard', {
                title: 'Dashboard - RideMap',
                isDashboard: true,
                user: {
                    ...req.session.user,
                    isAdmin: req.session.user.role === 'admin'
                }
            });
        };
        this.updateAvatar = async (req, res, next) => {
            try {
                if (!req.file) {
                    return res.status(400).json({ success: false, error: 'Arquivo não enviado' });
                }
                const avatarUrl = `/uploads/avatars/${req.file.filename}`;
                await userModel_1.default.updateAvatar(req.session.user.id, avatarUrl);
                req.session.user.avatar = avatarUrl;
                return res.json({ success: true, avatar_url: avatarUrl });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateProfile = async (req, res, next) => {
            try {
                const novoNome = req.body.nome;
                if (!nomeRegex.test(novoNome)) {
                    return res.status(400).json({ error: 'Nome deve ter 3-50 caracteres (apenas letras)' });
                }
                await userModel_1.default.updateProfile(req.session.user.id, novoNome);
                req.session.user.nome = novoNome;
                return res.json({ success: true, nome: novoNome });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = new AuthController();
