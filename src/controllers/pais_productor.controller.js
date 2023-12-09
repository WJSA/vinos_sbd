const pool = require('../db');

const getAllPaisProductor = async (req, res, next) => {
    try {
        const allPaises = await pool.query('SELECT * FROM pais_productor');
        res.json(allPaises.rows);
    } catch(e) {
        next(e);
    }
}

module.exports = {
    getAllPaisProductor,
}