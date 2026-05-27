const Http_error = (res, codigo) => {
    let mensaje = '';


    switch (codigo) {
        case 401:
            console.log('No esta autenticado o el token es invalido');
            break
        case 402:
            console.log('require Pago');
            break
        case 403:
            console.log('Se encuentra autenticado pero no tiene los permisos ');
            break
        case 404:
            console.log('Recuerso no encontrado');
            break
        case 405:
            console.log('Metodo Http no permitido');
            break
        case 406:
            console.log('Formato de respuesta no aceptado');
            break
        case 408:
            console.log('El cliente tardo demasiado');
            break
        case 409:
            console.log('Recurso duplicado (email,username)');
            break
        case 410:
            console.log('Recurso eliminado permanentemente ');
            break
        case 412:
            console.log('Precondicion Fallida');
            break
        case 413:
            console.log('Body demasiado grande');
            break
        case 415:
            console.log('Content-Type no soportado');
            break
        case 418:
            console.log('Easter egg del protocolo HTTP');
            break
        case 422:
            console.log('Datos bien formados oero invalidos semanticamente');
            break
        case 500:
            console.log('Error inesperado en el servidor');
            break
        case 501:
            console.log('Funcionalidad no implementada');
            break
        case 502:
            console.log('Error en el servidor intermedio');
            break
        case 503:
            console.log('Servidor temporalmente no disponible');
            break
        case 504:
            console.log('Timeout en servidor intermedio');
            break
        case 505:
            console.log('Version HTTP no soportado');
            break

    }

    console.log(mensaje);
    return res.status(codigo).json({
        status: 'error',
        codigo,
        mensaje
    })
};

module.exports ={Http_error};