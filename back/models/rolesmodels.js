const pool = require('../database/database');

const listar_roles = async() =>{
    const [rows] = await pool.query('SELECT id_rol, nombre FROM roles WHERE deleteDate IS NULL');
    return rows;
}

module.exports ={listar_roles}