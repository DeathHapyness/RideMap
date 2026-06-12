"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    const acceptsJson = req.xhr || req.headers.accept?.includes('json') || req.path.startsWith('/api/');
    if (acceptsJson) {
        return res.status(401).json({ error: 'Não autenticado' });
    }
    return res.redirect('/login');
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    if (req.session.user?.role === 'admin') {
        return next();
    }
    return res.status(403).json({ error: 'Acesso negado! Apenas administradores.' });
};
exports.isAdmin = isAdmin;
