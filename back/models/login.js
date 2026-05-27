const pool = require('../database/conexiondatabase');

const usuario = async (email) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?',[email]);
    return rows[0];
};

const usuarioPorId = async (id) => {
    const [rows] = await pool.query('SELECT id_user , email FROM users WHERE id_user  = ?', [id]);
    return rows[0];
};

module.exports = { usuario, usuarioPorId };