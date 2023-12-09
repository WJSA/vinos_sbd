const { Router } = require('express');
const { getAllEmpresas, getEmpresa, createEmpresa } = require('../controllers/empresa.controller')

const router = Router();

router.post('/empresas', createEmpresa)

module.exports = router;