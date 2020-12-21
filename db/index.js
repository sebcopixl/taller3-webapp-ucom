
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('app.properties');

var _ = require('lodash');
//conexion a la base de datos Postgres
const {
    Pool,
    Client
} = require('pg');

const Router = require('express-promise-router')


const pool = new Pool({
    host: properties.get('db.host'),
    database: properties.get('db.database'),
    port: properties.get('db.port'),
    user: properties.get('db.username'),
    password: properties.get('db.password'),
});



const SQL_OBTENER_LISTA_MASCOTA_POR_ID="select * from mascota where id_mascota=$1";
const SQL_INSERTAR_MASCOTA="insert into mascota(nombre, id_categoria) values($1, $2) RETURNING id_mascota";
const SQL_OBTENER_CATEGORIA_POR_ID="select * from categoria where id=$1";
const SQL_OBTENER_CLIENTE_POR_ID="select * from cliente where id_cliente=$1";
const SQL_INSERTAR_SERVICIO="INSERT INTO servicio(id_cliente, id_mascota, id_tipo_servicio, estado, fecha_servicio) VALUES($1, $2, $3, $4, $5) RETURNING id_servicio";
const SQL_OBTENER_SERVICIOS="SELECT * FROM servicio";
const SQL_OBTENER_SERVICIO_POR_ID="select s.id_cliente, c.nombre, c.apellido, s.fecha_servicio, s.estado, m.nombre as mascota from servicio s left join cliente c on c.id_cliente=s.id_cliente::int4 left join tipo_servicio ts on ts.id_tipo_servicio=s.id_tipo_servicio left join cliente_mascota cm on cm.id_cliente=s.id_cliente::int4 left join mascota m on m.id_mascota = cm.id_mascota where c.id_cliente=$1 and ts.id_tipo_servicio=$2 order by s.id_cliente asc, s.fecha_servicio desc, s.estado desc";
const SQL_INSERTAR_ARTICULO="INSERT INTO articulo(descripcion, precio_publico, precio_mayorista, activo) VALUES($1, $2, $3, $4) RETURNING id_articulo";
const SQL_OBTENER_ARTICULOS="SELECT * FROM articulo";
const SQL_INSERTAR_VENTA="INSERT INTO venta(id_cliente, monto_total, nro_factura, activo) VALUES($1, $2, $3, $4) RETURNING id_venta";
const SQL_OBTENER_VENTAS="SELECT * FROM venta";

function insertarMascota(datos){
    console.log("db => insertarMascota ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_MASCOTA,[datos.nombre,datos.id_categoria]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarServicio(datos){
    console.log("db => insertarServicio ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_SERVICIO, [datos.id_cliente, datos.id_mascota, datos.id_tipo_servicio, datos.estado, datos.fecha_servicio]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarArticulo(datos) {
    console.log("db => insertarArticulo ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_ARTICULO, [datos.descripcion, datos.precio_publico, datos.precio_mayorista, datos.activo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}

function insertarVenta(datos) {
    console.log("db => insertarVenta ")
    console.log("datos =>", datos)
    try {
        const res = pool.query(SQL_INSERTAR_VENTA, [datos.id_cliente, datos.monto_total, datos.nro_factura, datos.activo]);
        console.log("res", res);
        return res;
    } catch(err) {
        console.log(err.stack)
        return err.stack;
    }
}


module.exports = {
    obtenerMascotaPorID: (id)=>pool.query(SQL_OBTENER_LISTA_MASCOTA_POR_ID,[id]),
    insertarMascota: insertarMascota,
    obtenerCategoriaPorID: (id)=>pool.query(SQL_OBTENER_CATEGORIA_POR_ID,[id]),
    obtenerClientePorID: (id_cliente)=>pool.query(SQL_OBTENER_CLIENTE_POR_ID,[id_cliente]),
    insertarServicio: insertarServicio,
    obtenerServicios: () => pool.query(SQL_OBTENER_SERVICIOS, []),
    obtenerServicioPorID: (id_cliente, id_tipo_servicio)=>pool.query(SQL_OBTENER_SERVICIO_POR_ID,[id_cliente, id_tipo_servicio]),
    insertarArticulo: insertarArticulo,
    obtenerArticulos: () => pool.query(SQL_OBTENER_ARTICULOS, []),
    insertarVenta: insertarVenta,
    obtenerVentas: () => pool.query(SQL_OBTENER_VENTAS, []),
}
