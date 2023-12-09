const pool = require('../db')

const createEmpresa = async (req, res, next) => {
    const { id_pais_productor, id_region_vinicola_do, nombre, fecha_fundacion, direccion, descripcion_bodega, telefono, pagina_web, descripcion_vinos} = req.body;

    try {
        const result = await pool.query('INSERT INTO empresa (id_pais_productor, id_region_vinicola_do, nombre, fecha_fundacion, direccion, descripcion_bodega, telefono, pagina_web, descripcion_vinos) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *', [
            id_pais_productor, 
            id_region_vinicola_do, 
            nombre, 
            fecha_fundacion, 
            direccion, 
            descripcion_bodega, 
            telefono, 
            pagina_web, 
            descripcion_vinos
        ]);

        res.json(result.rows[0]);

    } catch(e) {
        next(e);
    }
}

module.exports = {
    createEmpresa
}