const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { logeo_usuario } = require('../models/authmodel');
const { Http_error } = require('../utils/err_status')

const auth_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user_email = await logeo_usuario(email);

        if (!user_email) {
            return Http_error(res, 404);
        }

        const revision_password = await bcrypt.compare(password, user_email.password);
        if(!revision_password){
            return Http_error(res, 401);
        }

        const token = jwt.sign(
            {id: user_email.id_user, email: user_email.email},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        );

        return res.status(200).json({
            status: "Exito-Success",
            message: "Inicio de sesion-Auth success",
            token: token
        })

    }catch(error){
        return Http_error(res, 500);
    };
};

module.exports = {auth_login};