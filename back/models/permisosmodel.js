const pool = require('../database/database');

const listar_permisos = async ()=>{
    const [rows] = await pool.query('SELECT * FROM rol_permioso WHERE deleteDate IS NULL');
    return rows;
};

module.exports = {listar_permisos};