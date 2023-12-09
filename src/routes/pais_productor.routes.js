const { Router } = require('express');
const { getAllPaisProductor } = require('../controllers/pais_productor.controller');

const router = Router();

router.get('/paises_productores', getAllPaisProductor)


module.exports = router;