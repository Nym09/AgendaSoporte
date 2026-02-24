const jwt = require('jsonwebtoken');

const verificartoken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No se encontró el token" });
    }

    try {
        const decodificar = jwt.verify(token, process.env.jwt_secret);
        req.user = decodificar; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
};

module.exports = verificartoken;