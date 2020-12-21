var express = require('express');
var cors = require('cors');
var router = express.Router();
const db = require('../../db');


router.get('', cors(), async(req, res, next) => {
    console.log("lista articulos");
    let result = await db.obtenerArticulos();
    console.log("se encontró "+result.rowCount+" articulos")
    res.send(result.rows);
});

router.post('/insertar', cors(), async(req, res, next)=>{
    console.log("insertar articulo")
    var result={};
    console.log("params", req.body);
  
    var articulo=req.body;
    result= await db.insertarArticulo(articulo);
  
    if(result.rows){
        res.send(result.rows[0]);
    }else{
        res.send("No se pudo insertar");
    }
  });

module.exports = router;