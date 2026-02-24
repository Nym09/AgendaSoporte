const express = require('express');
const router = express.Router();
const { login } = require('../controllers/logincontroller');
const verificartoken = require('../middlewares/loginmiddlewares');
const { usuarioPorId } = require('../models/login');

router.post('/', login);

router.get('/user', verificartoken, async (req, res) => {
    try {
        const user = await usuarioPorId(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ status: "Success", data: user });

    } catch (error) {
        console.error("ERROR EN /user:", error);
        res.status(500).json({ message: "Server error" });

    }
});

router.post('/finalizarsesion', (req, res) => {
    res.clearCookie("token");
    res.json({ status: "Success", message: "Sesion finalizada" });
})

module.exports = router;