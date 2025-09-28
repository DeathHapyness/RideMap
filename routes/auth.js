const express = require('express');
const router = express.Router();
const connection = require('../db/config');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ 
            error: 'Email e senha são obrigatórios' 
        });
    }

    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        connection.query(query, [email], async (error, results) => {
            if (error) {
                console.error('Erro ao buscar usuário:', error);
                return res.status(500).json({ 
                    error: 'Erro interno do servidor' 
                });
            }

            if (results.length === 0) {
                return res.status(401).json({ 
                    error: 'Usuário não encontrado' 
                });
            }

            const usuario = results[0];

            // Verifica a senha
            if (senha !== usuario.senha) { 
                return res.status(401).json({ 
                    error: 'Senha incorreta' 
                });
            }

            delete usuario.senha;

            // Busca a foto de perfil do usuário, se existir
            const queryFoto = 'SELECT url_foto FROM fotos_perfil WHERE usuario_id = ? ORDER BY data_upload DESC LIMIT 1';
            connection.query(queryFoto, [usuario.id], (error, resultsFoto) => {
                if (error) {
                    console.error('Erro ao buscar foto do perfil:', error);
                }

                if (resultsFoto && resultsFoto.length > 0) {
                    usuario.avatar = resultsFoto[0].url_foto;
                } else {
                    usuario.avatar = '/img/default-avatar.png';
                }

                // Retorna os dados do usuário
                res.json(usuario);
            });
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

module.exports = router;