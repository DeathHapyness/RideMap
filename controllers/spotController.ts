import type { Request, Response, NextFunction } from 'express';
import spotModel from '../models/spotModel';
import notificationModel from '../models/notificationModel';

class SpotController {
  listApprovedSpots = async (_req: any, res: any, next: any) => {
    try {
      const spots = await spotModel.listApproved();
      return res.json(spots);
    } catch (error) {
      next(error);
    }
  };

  createSpot = async (req: any, res: any, next: any) => {
    try {
      const { nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude } = req.body;
      await spotModel.create({
        nome,
        cidade,
        estado,
        tipo,
        dificuldade,
        descricao,
        latitude,
        longitude,
        usuarioId: req.session.user.id
      });

      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  mySpots = async (req: any, res: any, next: any) => {
    try {
      const spots = await spotModel.listByUser(req.session.user.id);
      return res.json(spots);
    } catch (error) {
      next(error);
    }
  };

  notificationCount = async (req: any, res: any, next: any) => {
    try {
      const total = await notificationModel.countUnread(req.session.user.id);
      return res.json({ total });
    } catch (error) {
      next(error);
    }
  };

  notifications = async (req: any, res: any, next: any) => {
    try {
      const items = await notificationModel.listForUser(req.session.user.id);
      return res.json(items);
    } catch (error) {
      next(error);
    }
  };

  markNotificationAsRead = async (req: any, res: any, next: any) => {
    try {
      const notificationId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      await notificationModel.markAsRead(notificationId, req.session.user?.id ?? 0);
      return res.json({ success: true });
    } catch (error) {
      next(error);
    }
  };

  filterDashboardGet = async (req: any, res: any, next: any) => {
    try {
      const spots = await spotModel.listByFilters(req.query);
      return res.json(spots);
    } catch (error) {
      next(error);
    }
  };

  filterDashboardPost = async (req: any, res: any, next: any) => {
    try {
      const spots = await spotModel.listByFilters(req.body);
      return res.json(spots);
    } catch (error) {
      next(error);
    }
  };
}

export default new SpotController();
