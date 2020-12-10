var express = require('express');
var cors = require('cors');
var router = express.Router();
const db = require('../../db');


router.get('/obtener-por-id/:id_cliente', cors(), async (req, res, next) => {
    console.log("obtener cliente por id ", req.params.id_cliente);
  
    let result = await db.obtenerClientePorID(req.params.id_cliente);
    console.log("cliente", result);
    console.log("se encontró "+result.rowCount+" cliente")
    res.send(result.rows);
  
});

module.exports = router;