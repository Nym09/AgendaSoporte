const pool = require('../database/database');

const listar_clientes = async() =>{
    const [rows] = await pool.query('SELECT * FROM clientes WHERE deleteDate IS NULL');
    return rows;
};

const listar_clientes_id = async(id_cliente) =>{
    const [rows] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ? AND deleteDate IS NULL', [id_cliente]);
    return rows[0];
};

const crear_cliente = async(nombre,telefono,ciudad,email) =>{
    const [rows] = await pool.query('INSERT INTO clientes(cedula,nombre,telefono,ciudad,email) VALUES (?,?,?,?)',[nombre,telefono,ciudad,email]);
    return {
        id_cliente: rows.insertId,
        nombre,
        telefono,
        ciudad,
        email
    }
};

const actualizar_cliente = async(id_cliente, nombre, telefono, ciudad, email) =>{
    const [rows] = await pool.query('UPDATE clientes SET nombre = ?, telefono = ?, ciudad = ?, email =? WHERE id_cliente = ?',[nombre, telefono, ciudad, email, id_cliente]);
    return {
        datos_actualizados: rows.affectedRows,
        id_cliente,
        nombre,
        telefono,
        ciudad,
        email
    }
}

const eliminacion_logica_cliente = async(id_cliente) => {
    const [rows] = await pool.query('UPDATE clientes SET deleteDate = CURRENT_TIMESTAMP WHERE id_cliente = ?',[id_cliente]);
    return {
        eliminacion_logica: rows.affectedRows > 0,
        id_cliente
    }
}

const restaurar_cliente_logico = async(id_cliente) =>{
    const [rows] = await pool.query('UPDATE clientes SET deleteDate = NULL WHERE id_cliente = ?',[id_cliente]);
    return rows.affectedRows > 0;
}

module.exports = {listar_clientes, listar_clientes_id, crear_cliente, actualizar_cliente, eliminacion_logica_cliente, restaurar_cliente_logico}