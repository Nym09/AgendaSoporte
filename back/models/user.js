const pool =  require('../database/conexiondatabase');

const roles = async() =>{
    const [rows] = await pool.query('SELECT id_rol, name FROM roles WHERE deleteDate IS NULL');
    return rows;
};

const emailduplicado = async (email)=>{
    const [rows] =await pool.query('SELECT email FROM users WHERE email =?',[email])
};

const registrousuario = async (name, email, password, rol) => {

    const [result] = await pool.query( 'INSERT INTO users (name,email,password,id_rol) VALUES (?,?,?,?)',[name, email, password, rol]);
    return result;
};

module.exports = {roles,emailduplicado,registrousuario}