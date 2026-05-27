const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usuario } = require('../models/login');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usuario(email);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const revisionpassword = await bcrypt.compare(password, user.password)
        if (!revisionpassword) {
            return res.status(401).json({ message: "Clave incorrecta" });
        }

        const token = jwt.sign({ id: user.id_user, email: user.email },
            process.env.jwt_secret, { expiresIn: '1h' }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })


        return res.status(200).json({ status: "Success", message: "Login Success" });


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};



module.exports = { login };