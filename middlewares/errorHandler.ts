import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, req: any, res: any, _next: any) => {
  console.error(err.stack || err.message);

  if (req.xhr || req.headers.accept?.includes('json')) {
    return res.status(500).json({ error: 'Algo deu errado!' });
  }

  return res.status(500).render('error', {
    title: 'Erro - RideMap',
    message: 'Algo deu errado!'
  });
};
