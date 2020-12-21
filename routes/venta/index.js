var express = require('express');
var cors = require('cors');
var router = express.Router();
const db = require('../../db');


router.get('', cors(), async(req, res, next) => {
    console.log("lista ventas");
    let result = await db.obtenerVentas();
    console.log("se encontró "+result.rowCount+" ventas")
    res.send(result.rows);
});

router.post('/insertar', cors(), async(req, res, next)=>{
    console.log("insertar venta")
    var result={};
    console.log("params", req.body);
  
    var venta=req.body;
    result= await db.insertarVenta(venta);
  
    if(result.rows){
        res.send(result.rows[0]);
    }else{
        res.send("No se pudo insertar");
    }
  });

module.exports = router;