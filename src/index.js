const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const empresaRouter = require('./routes/empresa.routes')
const paisProductorRouter = require('./routes/pais_productor.routes')
const regionVinicolaDo = require('./routes/region_vinicola_do.routes')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use(empresaRouter);
app.use(paisProductorRouter)
app.use(regionVinicolaDo)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.listen(4000);
console.log('Server on port 4000');