import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
const session = require('express-session');
const exphbs = require('express-handlebars');
import path from 'path';
import router from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views', 'partials'),
  helpers: {
    formatDate(date: string | Date) {
      if (!date) return '';
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
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || 'seu-segredo-aqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const publicDir = path.join(__dirname, 'public');
app.use('/static', express.static(publicDir));
app.use('/public', express.static(publicDir));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req: any, res: any, next: any) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', router);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).render('404', { title: '404 - Página não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
