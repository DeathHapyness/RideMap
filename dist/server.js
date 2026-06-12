"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const session = require('express-session');
const exphbs = require('express-handlebars');
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path_1.default.join(__dirname, 'views', 'partials'),
    helpers: {
        formatDate(date) {
            if (!date)
                return '';
            const d = new Date(date);
            return d.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, cors_1.default)());
app.use(session({
    secret: process.env.SESSION_SECRET || 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const publicDir = path_1.default.join(__dirname, 'public');
app.use('/static', express_1.default.static(publicDir));
app.use('/public', express_1.default.static(publicDir));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});
app.use('/', routes_1.default);
app.use(errorHandler_1.errorHandler);
app.use((req, res) => {
    res.status(404).render('404', { title: '404 - Página não encontrada' });
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
