const express = require('express');
const router = express.Router();

const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { validateStar } = require('../middleware/validation');

router.use(isAuthenticated);

router.post('/stars', validateStar, (req, res) => {
  const userId = req.session.user.id;
  res.json({ message: 'Estrela adicionada!', userId });
});

router.get('/profile', (req, res) => {
  res.json({ user: req.session.user });
});

router.delete('/admin/users/:id', isAdmin, (req, res) => {
  res.json({ message: 'Usuário deletado' });
});

module.exports = router;