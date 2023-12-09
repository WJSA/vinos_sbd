const pool = require('../db');

const getRegionVinicolaDo = async (req, res, next) => {
    try {
        const {id} = req.params

        const result  = await pool.query('SELECT * FROM region_vinicola_do WHERE id_pais_productor = $1', [id])
        
        if (result.rows.length === 0) return res.status(404).json({
            message: 'Region vinicola no encontrada'
        });
    
        res.json(result.rows[0]);
    } catch(e) {
        next(e);
    }
}

module.exports = {
    getRegionVinicolaDo,
}