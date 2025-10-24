const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const upload = require('./config/multer');
const pool = require('./db/config');

//**Verifica se esta logado */
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/login');
}

//* Verifica se é ADMIN
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Acesso negado! Apenas administradores.' });
}

//**deixar sempre para redirecionar para '/' ao invés de '/login' para evitar loops

function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/');
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
  email: rows[0].email,
  avatar: rows[0].avatar,
  role: rows[0].role  
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
    isDashboard: true,
    user: {
      ...req.session.user,
      isAdmin: req.session.user.role === 'admin'
    }
  });
});

router.get('/api/spots', async (req, res) => {
  const [spots] = await pool.query('SELECT * FROM pistas WHERE status = ?', ['aprovada']);
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

function isAuthenticated(req, res, next) {
  if (req.session.user) { 
    return next(); 
  }
  res.redirect('/login'); 
}

//! nunca mexer nesta poha se nao explode tudo
function isAdmin(req, res, next) {
  console.log('usuario logado no momento:', req.session.user);
  
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Acesso negado! Apenas administradores.' });
}

// ========== ROTAS DE ADMIN ==========

router.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin-dashboard', { 
    title: 'Painel Admin - RideMap',
    user: req.session.user
  });
});

//* Buscar pistas pendentes (API) fazer api
router.get('/api/admin/pistas-pendentes', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [pistas] = await pool.query(`
      SELECT p.*, u.nome as usuario_nome 
      FROM pistas p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.status = 'pendente'
      ORDER BY p.data_criacao DESC
    `);
    res.json(pistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pistas' });
  }
});

router.post('/api/admin/aprovar-pista/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const pistaId = req.params.id;
    const adminId = req.session.user.id;
    
    const [pista] = await pool.query('SELECT usuario_id FROM pistas WHERE id = ?', [pistaId]);
    if (!pista[0]) {
      return res.status(404).json({ error: 'Pista não encontrada' });
    }
    
    await pool.query(
      'UPDATE pistas SET status = ?, moderador_id = ?, data_moderacao = NOW() WHERE id = ?',
      ['aprovada', adminId, pistaId]
    );
    
    await pool.query(
      'INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES (?, ?, ?)',
      [pista[0].usuario_id, 'pista_aprovada', '✅ Sua pista foi aprovada e já está visível no mapa!']
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao aprovar pista' });
  }
});

router.post('/api/admin/rejeitar-pista/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const pistaId = req.params.id;
    const adminId = req.session.user.id;
    const motivo = req.body.motivo;
    
    if (!motivo || motivo.trim() === '') {
      return res.status(400).json({ error: 'Motivo é obrigatório' });
    }
    
    const [pista] = await pool.query('SELECT usuario_id FROM pistas WHERE id = ?', [pistaId]);
    if (!pista[0]) {
      return res.status(404).json({ error: 'Pista não encontrada' });
    }
    
    await pool.query(
      'UPDATE pistas SET status = ?, motivo_rejeicao = ?, moderador_id = ?, data_moderacao = NOW() WHERE id = ?',
      ['rejeitada', motivo, adminId, pistaId]
    );
    
    await pool.query(
      'INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES (?, ?, ?)',
      [pista[0].usuario_id, 'pista_rejeitada', `❌ Sua pista foi rejeitada. Motivo: ${motivo}`]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao rejeitar pista' });
  }
});

router.post('/api/pistas/criar', isAuthenticated, async (req, res) => {
  try {
    const { nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude } = req.body;
    const usuarioId = req.session.user.id;

    await pool.query(
      'INSERT INTO pistas (nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuario_id, status, data_criacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
      [nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuarioId, 'pendente']
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pista' });
  } 
});

//**Logica de notificacoes para usuarios */

router.get('/api/notificacoes/count', isAuthenticated, async (req, res) => {
  try {
    const usuarioId = req.session.user.id;
    const [resultado] = await pool.query(
      'SELECT COUNT(*) as total FROM notificacoes WHERE usuario_id = ? AND lida = ?',
      [usuarioId, 0]
    );
    res.json({ total: resultado[0].total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
});

router.get('/api/notificacoes', isAuthenticated, async (req, res) => {
  try {
    const usuarioId = req.session.user.id;
    const [notificacoes] = await pool.query(
      'SELECT * FROM notificacoes WHERE usuario_id = ? ORDER BY data_criacao DESC',
      [usuarioId]
    );
    res.json(notificacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
});

router.post('/api/notificacoes/marcar-lida/:id', isAuthenticated, async (req, res) => {
  try {
    const notificacoesId = req.params.id;
    const usuarioId = req.session.user.id;
    await pool.query(
      'UPDATE notificacoes SET lida = ? WHERE id = ? AND usuario_id = ?',
      [1, notificacoesId ,usuarioId]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao marcar notificações como lidas' });
  }
});

module.exports = router;
