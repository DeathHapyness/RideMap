const express = require('express');
const cors = require('cors');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Handlebars
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'view/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'view'));

// Configuração do CORS
app.use(cors());

// Configuração da sessão
app.use(session({
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use('/', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(500).json({ error: 'Algo deu errado!' });
    }
    
    res.status(500).render('error', {
        title: 'Erro - RideMap',
        message: 'Algo deu errado!'
    });
});

// Rota 404 DEVE SER A ÚLTIMA!
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404 - Página não encontrada'
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});