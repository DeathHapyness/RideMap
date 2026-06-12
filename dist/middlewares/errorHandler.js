"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, _next) => {
    console.error(err.stack || err.message);
    if (req.xhr || req.headers.accept?.includes('json')) {
        return res.status(500).json({ error: 'Algo deu errado!' });
    }
    return res.status(500).render('error', {
        title: 'Erro - RideMap',
        message: 'Algo deu errado!'
    });
};
exports.errorHandler = errorHandler;
