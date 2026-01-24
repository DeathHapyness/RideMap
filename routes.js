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
    const spots = await pool.query('SELECT * FROM pistas WHERE status = $1', ['aprovada']);
    res.json(spots.rows);
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

    const rows = await pool.query('SELECT * FROM usuarios WHERE email = $1', [req.body.email]);
    if (!rows.rows[0]) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(req.body.senha, rows.rows[0].senha);
    if (!match) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const user = {
      id: rows.rows[0].id,
      nome: rows.rows[0].nome,
      email: rows.rows[0].email,
      avatar: rows.rows[0].avatar_url,
      role: rows.rows[0].role  
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
    const existing = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Hash da senha
    const hash = await bcrypt.hash(senha, 15);

    await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', 
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
    
    const usuario = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    
    if (!usuario.rows[0]) {
      return res.json({ 
        success: true, 
        message: 'Email enviado, você receberá instruções de como recuperar sua senha.' 
      });
    }
    
    // Gera token único
    const token = crypto.randomBytes(32).toString('hex');
    const expiracao = new Date(Date.now() + 3600000); 
    
    await pool.query(
      'UPDATE usuarios SET reset_token = $1, reset_expira = $2 WHERE email = $3',
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
      'UPDATE usuarios SET avatar_url = $1 WHERE id = $2',
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
      'UPDATE usuarios SET nome = $1 WHERE id = $2',
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
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
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
    const pistas = await pool.query(
      'SELECT * FROM pistas WHERE usuario_id = $1 ORDER BY data_criacao DESC',
      [usuarioId]
    );
    res.json(pistas.rows);
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
    const resultado = await pool.query(
      'SELECT COUNT(*) as total FROM notificacoes WHERE usuario_id = $1 AND lida = $2',
      [usuarioId, 0]
    );
    res.json({ total: resultado.rows[0].total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
});

router.get('/api/notificacoes', isAuthenticated, async (req, res) => {
  try {
    const usuarioId = req.session.user.id;
    const notificacoes = await pool.query(
      'SELECT * FROM notificacoes WHERE usuario_id = $1 ORDER BY data_criacao DESC',
      [usuarioId]
    );
    res.json(notificacoes.rows);
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
      'UPDATE notificacoes SET lida = $1 WHERE id = $2 AND usuario_id = $3',
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
    const result = await pool.query(`
      SELECT COUNT(*) as total
      FROM usuarios
      WHERE ativo = TRUE
    `);
    
    res.json({ 
      success: true,
      total: result.rows[0].total 
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
    const result = await pool.query(`
      SELECT COUNT(*) as total
      FROM pistas
      WHERE status = 'aprovada'
    `);
    
    res.json({ 
      success: true,
      total: result.rows[0].total 
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
    const pistas = await pool.query(`
      SELECT p.*, u.nome as usuario_nome 
      FROM pistas p
      JOIN usuarios u ON p.usuario_id = u.id
      WHERE p.status = 'pendente'
      ORDER BY p.data_criacao DESC
    `);
    res.json(pistas.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar pistas' });
  }
});

// Nova rota: buscar TODAS as pistas (pendentes, ativas, rejeitadas)
router.get('/api/admin/todas-pistas', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const pistas = await pool.query(`
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
    const pistasNormalizadas = pistas.rows.map(pista => ({
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
    const usuarios = await pool.query(`
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
    res.json({ success: true, usuarios: usuarios.rows });
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
      'UPDATE usuarios SET ativo = $1 WHERE id = $2',
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
      'UPDATE usuarios SET ativo = $1 WHERE id = $2',
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
    
    const pista = await pool.query('SELECT usuario_id FROM pistas WHERE id = $1', [pistaId]);
    if (!pista.rows[0]) {
      return res.status(404).json({ error: 'Pista não encontrada' });
    }
    
    await pool.query(
      'UPDATE pistas SET status = $1, moderador_id = $2, data_moderacao = NOW() WHERE id = $3',
      ['aprovada', adminId, pistaId]
    );
    
    await pool.query(
      'INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES ($1, $2, $3)',
      [pista.rows[0].usuario_id, 'pista_aprovada', '✅ Sua pista foi aprovada e já está visível no mapa!']
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
    
    const pista = await pool.query('SELECT usuario_id FROM pistas WHERE id = $1', [pistaId]);
    if (!pista.rows[0]) {
      return res.status(404).json({ error: 'Pista não encontrada' });
    }
    
    await pool.query(
      'UPDATE pistas SET status = $1, motivo_rejeicao = $2, moderador_id = $3, data_moderacao = NOW() WHERE id = $4',
      ['rejeitada', motivo, adminId, pistaId]
    );
    
    await pool.query(
      'INSERT INTO notificacoes (usuario_id, tipo, mensagem) VALUES ($1, $2, $3)',
      [pista.rows[0].usuario_id, 'pista_rejeitada', `❌ Sua pista foi rejeitada. Motivo: ${motivo}`]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao rejeitar pista' });
  }
});

//**Rota de filtros */
router.get('/api/dashboard', async (req, res) => {
  try {
    const { tipo, dificuldade, cidade, estado } = req.query;

    console.log('Filtros recebidos:',req.query, { tipo, dificuldade, cidade, estado });

    let query = 'SELECT * FROM pistas WHERE status = $1';
    const params = ['aprovada'];
    let paramCount = 2;

    if (tipo) {
      query += ` AND tipo = $${paramCount}`;
      params.push(tipo);
      paramCount++;
    }
    if (dificuldade) {
      query += ` AND dificuldade = $${paramCount}`;
      params.push(dificuldade);
      paramCount++;
    }
    if (estado) {
      query += ` AND estado = $${paramCount}`;
      params.push(estado);
      paramCount++;
    }
    const pistas = await pool.query(query, params);
    res.json(pistas.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao filtrar pistas' });
  }
});  

router.post('/api/dashboard', async (req, res) => {
  try {
    const { tipo, dificuldade, cidade, estado } = req.body;

    console.log('Filtros recebidos (POST):', req.body, { tipo, dificuldade, cidade, estado });
    
    let query = 'SELECT * FROM pistas WHERE status = $1';
    const params = ['aprovada'];
    let paramCount = 2;

    if (tipo && tipo.length > 0) {
      const placeholders = tipo.map(() => `$${paramCount++}`).join(',');
      query += ` AND tipo IN (${placeholders})`;
      params.push(...tipo);
    }

    if (dificuldade && dificuldade.length > 0) {
      const placeholders = dificuldade.map(() => `$${paramCount++}`).join(',');
      query += ` AND dificuldade IN (${placeholders})`;
      params.push(...dificuldade);
    }

    if (cidade && cidade.length > 0) {
      const placeholders = cidade.map(() => `$${paramCount++}`).join(',');
      query += ` AND cidade IN (${placeholders})`;
      params.push(...cidade);
    }

    if (estado && estado.length > 0) {
      const placeholders = estado.map(() => `$${paramCount++}`).join(',');
      query += ` AND estado IN (${placeholders})`;
      params.push(...estado);
    }

    const pistas = await pool.query(query, params);
    res.json(pistas.rows);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao filtrar pistas' });
  }
});

router.get('/admin/dashboard', isAuthenticated, isAdmin, (req, res) => {
  res.render('admin-dashboard', { 
    title: 'Painel Admin - RideMap',
    user: req.session.user
  });
});

router.get('/api/admin/avisos', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const avisos = await pool.query(`
         SELECT 
        id, 
        titulo, 
        tipo, 
        mensagem, 
        ativo, 
        data_criacao, 
        expira_em
      FROM avisos
      ORDER BY data_criacao DESC
    `);
    res.json({ success: true, avisos: avisos.rows });
  } catch (error) {
    console.error('Erro ao buscar avisos:', error);
    res.status(500).json({ success: false, message: 'Erro ao buscar avisos' });
  }
});

router.post('/api/admin/avisos/criar', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { titulo, mensagem } = req.body;
    
    if (!titulo || titulo.trim() === '' || !mensagem || mensagem.trim() === '') {
      return res.status(400).json({ error: 'Título e mensagem são obrigatórios' });
    }
    
    await pool.query(
      'INSERT INTO avisos (titulo, mensagem, criado_em) VALUES ($1, $2, NOW())',
      [titulo, mensagem]
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao criar aviso:', error);
    res.status(500).json({ error: 'Erro ao criar aviso' });
  }
});

// ============================================================
// EXPORTS
// ============================================================

module.exports = router;