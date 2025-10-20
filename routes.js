const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('./db/config');
const upload = require('./config/multer');

//**deixar sempre para redirecionar para '/' ao invés de '/login' para evitar loops

function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/'); // ← MUDE AQUI
}

router.get('/', (req, res) => {
  res.render('home', { title: 'RideMap' });
});

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.redirect('/'); // redireciona para home
});

router.post('/login', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email]);
    if (!rows[0]) return res.status(401).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(req.body.senha, rows[0].senha);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    const user = {
      id: rows[0].id,
      nome: rows[0].nome,
      email: rows[0].email
    };

    req.session.user = user;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

router.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('home', { title: 'Registro - RideMap', showRegisterModal: true });
});

router.post('/register', async (req, res) => {
  try {
    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [req.body.email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    const hash = await bcrypt.hash(req.body.senha, 10);
    await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
      [req.body.nome, req.body.email, hash]);
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { 
    title: 'Dashboard - RideMap',
    isDashboard: true
  });
});

router.get('/api/spots', async (req, res) => {
  const [spots] = await pool.query('SELECT * FROM pistas WHERE ativa = 1');
  res.json(spots);
});

router.post('/update-avatar', isAuthenticated, upload.single('avatar'), async (req, res) => {
    try {
        const userId = req.session.user.id;
        const avatarUrl = `/uploads/avatars/${req.file.filename}`;
        
        await pool.query(
            'UPDATE usuarios SET avatar_url = ? WHERE id = ?',
            [avatarUrl, userId]
        );
        
        res.json({ 
            success: true, 
            avatar_url: avatarUrl 
        });
        
    } catch (error) {
        console.error('Erro ao atualizar avatar:', error);
        res.status(500).json({ 
            success: false,
            error: 'Erro ao atualizar avatar' 
        });
    }
});

router.post('/update-profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const novoNome = req.body.nome;
        
        if (!novoNome || novoNome.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Não pode deixar vazio! Por favor preencha com seu nome ou apelido'
            });
        }
        
        await pool.query(
            'UPDATE usuarios SET nome = ? WHERE id = ?',
            [novoNome, userId]
        );
        
        req.session.user.nome = novoNome;
        
        res.json({
            success: true,
            nome: novoNome
        });
        
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar perfil'
        });
    }
});

module.exports = router;

//*Rota para envio de foto de perfil de user */
router.post('/update-profile', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const novoNome = req.body.nome;
        
        if (!novoNome || novoNome.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Não pode deixar vazio! Por favor preencha com seu nome ou apelido'
            });
        }
        
        //ATUALIZA o banco
        await pool.query(
            'UPDATE usuarios SET nome = ? WHERE id = ?',
            [novoNome, userId]
        );
        
        req.session.user.nome = novoNome;
        
        res.json({
            success: true,
            nome: novoNome
        });
        
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({
            success: false,
            error: 'Erro ao atualizar perfil'
        });
    }
});