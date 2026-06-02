const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const verificacion_token = require('../middlewares/tokenmiddleware');
const { listar_clientes, listar_clientes_id, crear_cliente,
    actualizar_cliente, eliminacion_logica_cliente,
    restaurar_cliente_logico } = require('../models/clientesmdel');
const { Http_error } = require('../utils/err_status');

router.get('/', verificacion_token, async (req, res) => {
    try {
        const clientes = await listar_clientes();
        return res.status(200).json({ status: 'Exito-Success', data: clientes });
    } catch (error) {
        return Http_error(res, 500);
    }
});

router.get('id/:id', verificacion_token, async (req, res) => {
    try {
        const clientes = await listar_clientes_id(req.params.id);
        if (!clientes) {
            return Http_error(res, 404);
        }

        return res.status(200).json({ status: 'Exito-Success', data: clientes })
    } catch (error) {
        return Http_error(res, 500);
    }
});

router.post('/', verificacion_token, async (req, res) => {
    try {
        const {cedula, nombre, telefono, ciudad, email } = req.body;
        if (!cedula || !nombre || !telefono || !ciudad || !email) {
            return Http_error(res, 400);
        }
    } catch (error) {
        return Http_error(res, 500)
    }
});

router.patch('/:id', verificacion_token, async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, ciudad, email } = req.body;

        const cliente_activo = await listar_clientes_id(id);
        if (!cliente_activo) {
            return Http_error(res, 404);
        }

        const actualizado = await actualizar_cliente(id, nombre, telefono, ciudad, email);
        return res.status(200).json({ status: 'Exito-Success', data: actualizado })
    } catch (error) {
        return Http_error(res, 500);
    }
});

router.patch('/restaurar/:id', verificacion_token, async (req, res)=>{
    try {
        const{ cedula } = req.params;
        const restaurado = await restaurar_cliente_logico(id);

        if(!restaurado){
            return Http_error(res, 404);
        }

        return res.status(200).json({ status: 'Exito-Success', date:restaurado});

    } catch (error) {
        return Http_error(res, 500);
    }
})

router.delete('/:id', verificacion_token, async (req, res) => {
    try {
        const { id } = req.params;

        const cliente_activo = await listar_clientes_id(id);
        if (!cliente_activo) {
            return Http_error(res, 404);
        }

        const eliminado = await eliminacion_logica_cliente(id);
        return res.status(201).json({ status: 'Exito-Success', data: eliminado });
    } catch (error) {
        return Http_error(res, 500);
    }
});




module.exports = router;


