import type { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: any, res: any, next: any) => {
  if (req.session.user) {
    return next();
  }

  const acceptsJson = req.xhr || req.headers.accept?.includes('json') || req.path.startsWith('/api/');
  if (acceptsJson) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  return res.redirect('/login');
};

export const isAdmin = (req: any, res: any, next: any) => {
  if (req.session.user?.role === 'admin') {
    return next();
  }

  return res.status(403).json({ error: 'Acesso negado! Apenas administradores.' });
};
