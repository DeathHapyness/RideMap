import type { Request, Response, NextFunction } from 'express';
import userModel from '../models/userModel';
import spotModel from '../models/spotModel';
import announcementModel from '../models/announcementModel';

class AdminController {
  dashboard = (req: any, res: any) => {
    res.render('admin-dashboard', {
      title: 'Painel Admin - RideMap',
      user: req.session.user
    });
  };

  stats = async (_req: any, res: any, next: any) => {
    try {
      const [activeUsers, approvedSpots, pendingSpots] = await Promise.all([
        userModel.countActiveUsers(),
        spotModel.countApproved(),
        spotModel.listPendingCount()
      ]);

      return res.json({ success: true, total: activeUsers, approvedSpots, pendingSpots });
    } catch (error) {
      next(error);
    }
  };

  pendingSpots = async (_req: any, res: any, next: any) => {
    try {
      const spots = await spotModel.listPending();
      return res.json(spots);
    } catch (error) {
      next(error);
    }
  };

  allSpots = async (_req: any, res: any, next: any) => {
    try {
      const spots = await spotModel.listAllForAdmin();
      return res.json({ success: true, pistas: spots });
    } catch (error) {
      next(error);
    }
  };

  allUsers = async (_req: any, res: any, next: any) => {
    try {
      const users = await userModel.listUsers();
      return res.json({ success: true, usuarios: users });
    } catch (error) {
      next(error);
    }
  };

  disableUser = async (req: any, res: any, next: any) => {
    try {
      const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { motivo } = req.body;
      if (!motivo) {
        return res.status(400).json({ error: 'Motivo é obrigatório' });
      }
      await userModel.setActive(userId, false);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  enableUser = async (req: any, res: any, next: any) => {
    try {
      const userId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await userModel.setActive(userId, true);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  approveSpot = async (req: any, res: any, next: any) => {
    try {
      const spotId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await spotModel.approve(spotId, req.session.user?.id ?? 0);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  rejectSpot = async (req: any, res: any, next: any) => {
    try {
      const spotId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const { motivo } = req.body;
      if (!motivo || motivo.trim() === '') {
        return res.status(400).json({ error: 'Motivo é obrigatório' });
      }
      await spotModel.reject(spotId, req.session.user?.id ?? 0, motivo);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  listAnnouncements = async (_req: any, res: any, next: any) => {
    try {
      const announcements = await announcementModel.getAll();
      return res.json({ success: true, avisos: announcements });
    } catch (error) {
      next(error);
    }
  };

  createAnnouncement = async (req: any, res: any, next: any) => {
    try {
      const { titulo, mensagem } = req.body;
      if (!titulo || titulo.trim() === '' || !mensagem || mensagem.trim() === '') {
        return res.status(400).json({ error: 'Título e mensagem são obrigatórios' });
      }
      const aviso = await announcementModel.create({ titulo, mensagem, tipo: 'info', ativo: true });
      return res.json({ success: true, aviso });
    } catch (error) {
      next(error);
    }
  };
}

export default new AdminController();
