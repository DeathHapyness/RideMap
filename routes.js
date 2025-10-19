const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('./db/config');

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

// MUDE register para renderizar 'home' também (já que você usa modal)
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

router.get('/spots', async (req, res) => {
  const [spots] = await pool.query('SELECT * FROM pistas WHERE ativa = 1');
  res.render('spots', { title: 'Pistas - RideMap', spots });
});

router.get('/add-spot', isAuthenticated, (req, res) => {
  res.render('add-spot', { title: 'Adicionar Pista - RideMap' });
});

router.post('/spots', isAuthenticated, async (req, res) => {
  await pool.query(
    'INSERT INTO pistas (nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [req.body.nome, req.body.cidade, req.body.estado, req.body.tipo, req.body.dificuldade, req.body.descricao, req.body.latitude, req.body.longitude]
  );
  res.redirect('/spots');
});

router.get('/spot/:id', async (req, res) => {
  const [spots] = await pool.query('SELECT * FROM pistas WHERE id = ?', [req.params.id]);
  if (!spots[0]) return res.redirect('/spots');
  res.render('spot', { title: spots[0].nome + ' - RideMap', spot: spots[0] });
});

router.get('/api/spots', async (req, res) => {
  const [spots] = await pool.query('SELECT * FROM pistas WHERE ativa = 1');
  res.json(spots);
});

module.exports = router;