const pool = require('../database/database');

const listar_empleados = async () => {
    const [rows] = await pool.query('SELECT * FROM users WHERE deleteDate is NULL');
    return rows;
};

const listar_empleado_id = async (id_user) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ? AND deleteDate is NULL', [id_user]);
    return rows[0];
};

const listar_empleado_email = async (email) => {
    const [rows] = await pool.query('SELECT id_user, email FROM users WHERE email = ? AND deleteDate is NULL', [email]);
    return rows[0];
};

const crear_empleado = async (nombre, email, password, id_rol) => {
    const [rows] = await pool.query('INSERT INTO users(nombre,email,password,id_rol) VALUES (?,?,?,?) ', [nombre, email, password, id_rol]);
    return {
        id_user: rows.insertId,
        nombre,
        email,
        password,
        id_rol
    }
};

const actualizar_empleado = async (id_user, nombre, email, password, id_rol) => {
    const [rows] = await pool.query('UPDATE users SET nombre = ?, email = ?, password = ?, id_rol =? WHERE id_user = ?', [nombre, email, password, id_rol, id_user]);
    return {
        datos_actualizados: rows.affectedRows,
        id_user,
        nombre,
        email,
        password,
        id_rol
    }
};

const eliminacion_logica_empleado = async(id_user) => {
    const [rows] = await pool.query('UPDATE users SET deleteDate = CURRENT_TIMESTAMP WHERE id_user = ?',[id_user]);
    return {
        eliminacion_logica: rows.affectedRows > 0,
        id_user,
    }
};

const restaurar_empleado_logico = async(id_user) =>{
    const [rows] = await pool.query('UPDATE users SET deleteDate = NULL WHERE id_user = ?',[id_user]);
    return rows.affectedRows > 0;
};

module.exports = {listar_empleados, listar_empleado_email, listar_empleado_id, crear_empleado, actualizar_empleado, eliminacion_logica_empleado, restaurar_empleado_logico}