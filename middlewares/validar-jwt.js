const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/user');

const validarJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');
    const secret = process.env.SECRETORPRIVATEKEY;
    
    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    try {

        const { uid } = jwt.verify( token, secret );

        // leer el usuario que corresponda al uid
        const usuario = await Usuario.findById( uid );

        // usuario undefined o no existe
        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        // verifica si el uid tiene estado true
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - estado: false'
            })
        }
        
        req.usuario = usuario;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}