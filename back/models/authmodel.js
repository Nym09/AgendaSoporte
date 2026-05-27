const pool = require('../database/database');

const logeo_usuario = async(email) =>{
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email]);
    return rows[0];
}

const logeo_usuario_id = async(id_user) =>{
    const [rows] = await pool.query('SELECT id_user, email FROM users WHERE id_user = ?',[id_user]);
    return rows[0];
}

module.exports = {logeo_usuario, logeo_usuario_id};