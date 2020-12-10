var express = require('express');
var cors = require('cors');
var router = express.Router();
const db = require('../../db');


router.get('/obtener-por-id/:id_cliente/:id_tipo_servicio', cors(), async (req, res, next) => {
    console.log("obtener cliente por id ", req.params.id_cliente, ' y por tipo servicio id ', req.params.id_tipo_servicio);
  
    let result = await db.obtenerServicioPorID(req.params.id_cliente, req.params.id_tipo_servicio);
    console.log("servicio ", result);
    console.log("se encontró "+result.rowCount+" servicios")
    res.send(result.rows);
  
});

module.exports = router;