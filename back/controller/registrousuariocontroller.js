//CORREGIR ESTO-----------------------------------------


/*const bcrypt = require('bcrypt');
const {registrousuario,emailduplicado} = require('../models/user');

const crearusuario = async(req,res) =>{
    try{
        const {name,email,password,rol} = req.body;

        const mismoemail = await emailduplicado(email);
        if (mismoemail){
            return res.status(400).json({
                message:"El email ya esta registrado"
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await registrousuario(name, email, hashPassword, rol);

        res.json({
            message: "Usuario creado correctamente",
            id: result.insertId
        });
    }catch(error){
        console.error("Error en /usuarioregistro", error)
        res.status(500).json({message:"error al crear el usuario"})
    }
}
*/