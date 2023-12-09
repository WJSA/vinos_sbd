const { Router } = require('express');
const { getRegionVinicolaDo } = require('../controllers/region_vinicola_do.controller');

const router = Router();

router.get('/region_vinicola_do/:id', getRegionVinicolaDo)


module.exports = router;