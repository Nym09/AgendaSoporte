const pool = require('../database/database');

const listar_roles = async() =>{
    const [rows] = await pool.query('SELECT id_rol, nombre FROM roles WHERE deleteDate IS NULL');
    return rows;
};

const listar_roles_id = async(id_rol) =>{
    const [rows] = await pool.query('SELECT * FROM roles WHERE id_rol = ? AND deleteDate IS NULL', [id_rol]);
    return rows[0];
};

const crear_rol = async(nombre) =>{
    const [rows] = await pool.query('INSERT INTO roles(nombre) VALUES (?)',[nombre]);
    return {
        id_rol: rows.insertId,
        nombre
    }
};

const asignar_permiso_rol = async(id_rol, id_permiso)=>{
    const [rows] = await pool.query('INSERT INTO rol_permiso(id_rol, id_permiso) VALUES (?,?)',[id_rol,id_permiso]);
    return rows;
}

const actualizar_rol = async(id_rol, nombre)=>{
    const [rows] = await pool.query('UPDATE roles SET nombre = ? WHERE id_rol =?',[nombre, id_rol]);
    return{
        datos_actualizados:rows.affectedRows,
        id_rol,
        nombre
    }
}

const eliminacion_logica_rol = async(id_rol)=>{
    const [rows] = await pool.query('UPDATE roles SET deleteDate = CURRENT_TIMESTAMP WHERE id_rol =? ', [id_rol]);
    return {
        eliminacion_logica: rows.affectedRows > 0,
        id_rol
    }
}


module.exports ={listar_roles, listar_roles_id, crear_rol, asignar_permiso_rol, actualizar_rol, eliminacion_logica_rol}