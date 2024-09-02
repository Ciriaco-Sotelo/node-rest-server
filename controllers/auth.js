const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req, res = response ) => {
    const { correo, password } = req.body;

    // veficar el email si existe
    const usuario = await Usuario.findOne({ correo });
    if( !usuario ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos --> correo'
        });
    }

    // si el usuario esta activo
    if( !usuario.estado ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos --> estado: false'
        });
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if( !validPassword ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos --> password'
        });
    }

    // generar JWT 
    const token = await generarJWT( usuario.id ); 

    try {
        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports = {
    login
}