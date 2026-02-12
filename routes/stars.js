const { Result } = require("pg");

app.use('/static', express.static('public'));
router.get('/api/stars'),async (req, res) => {
    try{
         const stars = await pool.query(`
            SELECT
            id,
            quantidade_estrelas,
            usuario_id,
            pista_id,
            created_at
            FROM stars
            `);
            res.json(Result.rows)
    }catch (error){
        console.error('Erro', error);
        res.status(500).json({error: 'Erro ao buscar estrelas'})
    }
};
module.exports = router;