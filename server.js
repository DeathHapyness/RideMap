const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());

// Configuração do CORS
app.use(cors());

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Algo deu errado!' 
    });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});