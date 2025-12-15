const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const upload = require('./config/multer');
const pool = require('./db/config');
const cloudinary = require('./config/cloudinary');
const { enviarEmailRecuperacao } = require('./email');

// ============================================================
// MIDDLEWARES DE AUTENTICAÇÃO E AUTORIZAÇÃO
// ============================================================

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  
  // Se for requisição API, retorna JSON
  if (req.xhr || req.headers.accept.indexOf('json') > -1 || req.path.startsWith('/api/')) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  
  // Se for página, redireciona
  res.redirect('/login');
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  res.status(403).json({ error: 'Acesso negado! Apenas administradores.' });
}

// ============================================================
// VALIDAÇÕES E REGEX
// ============================================================

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;
const nomeRegex = /^[a-záàâãéèêíïóôõöúçñ\s]{3,50}$/i;
const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// ============================================================
// ROTAS PÚBLICAS
// ============================================================

router.get('/', (req, res) => {
  res.render('home', { title: 'RideMap' });
});

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.redirect('/');
});

router.get('/register', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('home', { title: 'Registro - RideMap', showRegisterModal: true });
});

router.get('/api/spots', async (req, res) => {
  try {
    const [spots] = await pool.query('SELECT * FROM pistas WHERE status = ?', ['aprovada']);
    res.json(spots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pistas' });
  }
});

// ============================================================
// AUTENTICAÇÃO
// ============================================================

router.post('/login', async (req, res) => {
  try {
    // Validação de email
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email]);
    if (!rows[0]) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(req.body.senha, rows[0].senha);
    if (!match) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const user = {
      id: rows[0].id,
      nome: rows[0].nome,
      email: rows[0].email,
      avatar: rows[0].avatar_url,
      role: rows[0].role  
    };

    req.session.user = user;
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Validações
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido, tente novamente por favor' });
    }
    
    if (!nomeRegex.test(nome)) {
      return res.status(400).json({ error: 'Nome deve ter 3-50 caracteres (apenas letras)' });
    }
    
    if (!senhaRegex.test(senha)) {
      return res.status(400).json({ 
        error: 'Senha deve ter no mínimo 8 caracteres, 1 maiúscula, 1 minúscula e 1 número' 
      });
    }

    // Verifica se email já existe
    const [existing] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hash = await bcrypt.hash(senha, 15);

    await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', 
      [nome, email, hash]);
    
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

router.post('/recuperar-senha', async (req, res) => {
  console.log('Rota /recuperar-senha chamada!');
  console.log('Email recebido:', req.body.email);
  
  try {
    const { email } = req.body;
    
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    
    const [usuario] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    
    if (!usuario[0]) {
      return res.json({ 
        success: true, 
        message: 'Email enviado, você receberá instruções de como recuperar sua senha.' 
      });
    }
    
    // Gera token único
    const token = crypto.randomBytes(32).toString('hex');
    const expiracao = new Date(Date.now() + 3600000); 
    
    await pool.query(
      'UPDATE usuarios SET reset_token = ?, reset_expira = ? WHERE email = ?',
      [token, expiracao, email]
    );
    
    // Envia email
    await enviarEmailRecuperacao(email, token);
    
    res.json({ 
      success: true, 
      message: 'Email enviado! Verifique sua caixa de entrada.' 
    });
    
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
});

// ============================================================
// ROTAS DE USUÁRIO AUTENTICADO
// ============================================================

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
    
    if (!nomeRegex.test(novoNome)) {
      return res.status(400).json({ 
        error: 'Nome deve ter 3-50 caracteres (apenas letras)' 
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

// ============================================================
// ROTAS DE PISTAS
// ============================================================

router.post('/api/pistas/criar', isAuthenticated, async (req, res) => {
  try {
    const { nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude } = req.body;
    const usuarioId = req.session.user.id;

    await pool.query(
      `INSERT INTO pistas (nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuario_id, status, data_criacao) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [nome, cidade, estado, tipo, dificuldade, descricao, latitude, longitude, usuarioId, 'pendente']
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pista' });
  } 
});

router.get('/api/minhas-pistas', isAuthenticated, async (req, res) => {
  try {
    const usuarioId = req.session.user.id;
    const [pistas] = await pool.query(
      'SELECT * FROM pistas WHERE usuario_id = ? ORDER BY data_criacao DESC',
      [usuarioId]
    );
    res.json(pistas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar suas pistas' });
  }
});

// ============================================================
// ROTAS DE NOTIFICAÇÕES
// ============================================================

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
      [1, notificacoesId, usuarioId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao marcar notificações como lidas' });
  }
});

// ============================================================
// ROTAS DE ADMINISTRADOR
// ============================================================

router.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin-dashboard', { 
    title: 'Painel Admin - RideMap',
    user: req.session.user
  });
});

router.get('/api/admin/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT COUNT(*) as total
      FROM usuarios
      WHERE ativo = TRUE
    `);
    
    res.json({ 
      success: true,
      total: result[0].total 
    });
    
  } catch (error) {
    console.error('Erro ao contar usuários ativos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao contar usuários ativos' 
    });
  }
});

router.get('/api/admin/pistas-ativas', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT COUNT(*) as total
      FROM pistas
      WHERE status = 'aprovada'
    `);
    
    res.json({ 
      success: true,
      total: result[0].total 
    });
    
  } catch (error) {
    console.error('Erro ao contar pistas ativas:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao contar pistas ativas' 
    });
  }
});

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

// Nova rota: buscar TODAS as pistas (pendentes, ativas, rejeitadas)
router.get('/api/admin/todas-pistas', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [pistas] = await pool.query(`
      SELECT 
        p.id,
        p.nome,
        CONCAT(p.cidade, ' - ', p.estado) as localizacao,
        p.cidade,
        p.estado,
        p.latitude,
        p.longitude,
        p.tipo,
        p.dificuldade,
        p.status,
        p.data_criacao as criado_em,
        u.nome as usuario_nome
      FROM pistas p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      ORDER BY 
        CASE p.status 
          WHEN 'pendente' THEN 1 
          WHEN 'aprovada' THEN 2 
          WHEN 'ativa' THEN 2
          WHEN 'rejeitada' THEN 3 
        END,
        p.data_criacao DESC
    `);
    
    // Normalizar status 'aprovada' para 'ativa'
    const pistasNormalizadas = pistas.map(pista => ({
      ...pista,
      status: pista.status === 'aprovada' ? 'ativa' : pista.status
    }));
    
    res.json({ success: true, pistas: pistasNormalizadas });
  } catch (error) {
    console.error('Erro ao buscar todas as pistas:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar pistas' });
  }
});

// Buscar todos os usuários
router.get('/api/admin/todos-usuarios', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [usuarios] = await pool.query(`
      SELECT 
        u.id,
        u.nome,
        u.email,
        u.avatar_url,
        u.role,
        u.ativo,
        u.data_criacao,
        u.ultima_atividade,
        COUNT(p.id) as total_pistas
      FROM usuarios u
      LEFT JOIN pistas p ON u.id = p.usuario_id
      GROUP BY u.id
      ORDER BY u.data_criacao DESC
    `);
    res.json({ success: true, usuarios });
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar usuários' });
  }
});

// Desativar usuário
router.post('/api/admin/desativar-usuario/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const { motivo } = req.body;
    
    if (!motivo) {
      return res.status(400).json({ error: 'Motivo é obrigatório' });
    }
    
    // Apenas atualiza o status ativo (coluna motivo_desativacao não existe)
    await pool.query(
      'UPDATE usuarios SET ativo = ? WHERE id = ?',
      [false, usuarioId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao desativar usuário:', error);
    res.status(500).json({ error: 'Erro ao desativar usuário' });
  }
});

// Ativar usuário
router.post('/api/admin/ativar-usuario/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const usuarioId = req.params.id;
    
    await pool.query(
      'UPDATE usuarios SET ativo = ? WHERE id = ?',
      [true, usuarioId]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao ativar usuário:', error);
    res.status(500).json({ error: 'Erro ao ativar usuário' });
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

// ============================================================
// EXPORTS
// ============================================================

module.exports = router;