const jwt = require('jsonwebtoken');
const { Http_error } = require('../utils/err_status');

const verificacion_token = (req,res, next)=>{
    const auth_header = req.headers['authorization'];
    const token = auth_header && auth_header.split(' ')[1];

    if(!token){
        return Http_error(res,401)
    }

    try{
        const decodificar_token = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodificar_token;
        next();
    }catch (error){
        return Http_error(res,403)
    }
};

module.exports = verificacion_token;