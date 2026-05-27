const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const verificacion_token = require('../middleware/tokenmiddleware');
const { listar_empleados, listar_empleado_id, listar_empleado_email,
    crear_empleado, actualizar_empleado, eliminacion_logica_empleado,
    restaurar_empleado_logico } = require('../models/empleadosmodel');
const { Http_error } = require('../utils/err_status');

router.get('/', verificacion_token, async (req, res) => {
    try {
        const empleados = await listar_empleados();
        return res.status(200).json({ status: 'Exito-Success', data: empleados });
    } catch (error) {
        return Http_error(res, 500);
    }
});

router.get('/id/:id', verificacion_token, async (req, res) => {
    try {
        const empleado = await listar_empleado_id(req.params.id);
        if (!empleado) {
            return Http_error(res, 404);
        }

        return res.status(200).json({ status: 'Exito-Success', data: empleado });

    } catch (error) {
        return Http_error(res, 500);
    }
});

router.get('/email/:email', verificacion_token, async (req, res) => {
    try {
        const empleado = await listar_empleado_email(req.params.email);
        if (!empleado) {
            return Http_error(res, 404);
        }

        return res.status(200).json({ status: 'Exito-Success', data: empleado });

    } catch (error) {
        return Http_error(res, 500);
    }
});

router.post('/', verificacion_token, async (req, res) => {
    try {
        const { nombre, email, password, id_rol } = req.body;
        if (!nombre || !email || !password || !id_rol){
            return Http_error(res, 400);
        } 

        const email_activo = await listar_empleado_email(email);
        if (email_activo){
            return Http_error(res, 409)
        };

        const hash = await bcrypt.hash(password, 10);
        const nuevo = await crear_empleado(nombre, email, hash, id_rol);
        return res.status(201).json({ status: 'Exito-Success', data: nuevo });

    } catch (error) {
        return Http_error(res, 500);
    }
});

router.patch('/:id', verificacion_token, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, password, id_rol } = req.body;

        const empleado_activo = await listar_empleado_id(id);
        if (!empleado_activo) {
            return Http_error(res, 404);
        }

        const actualizado = await actualizar_empleado(id, nombre, email, password, id_rol);
        return res.status(200).json({ status: 'Exito-Success', data: actualizado });

    } catch (error) {
        return Http_error(res, 500);
    }
})

router.delete('/:id', verificacion_token, async (req, res) => {
    try {
        const { id } = req.params;

        const empleado_activo = await listar_empleado_id(id);
        if (!empleado_activo) {
            return Http_error(res, 404);
        }

        const eliminado = await eliminacion_logica_empleado(id);
        return res.status(201).json({ status: 'Exito-Success', data: eliminado });
    } catch (error) {
        return Http_error(res, 500);
    }
})

module.exports = router;