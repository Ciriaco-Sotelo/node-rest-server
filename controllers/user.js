const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/user');

const usuariosGet = async(req = request, res = response) => {
    const { limit = 5, since = 0 } =req.query;
    const queryState = { estado: true };

    //* promsesas en cascada
    // const usuarios = await Usuario.find( queryState )
    //     .skip(Number(since))
    //     .limit(Number(limit));

    // const total = await Usuario.countDocuments( queryState );

    const [ usuarios, total ] = await Promise.all([
        Usuario.find( queryState )
            .skip(Number(since))
            .limit(Number(limit)),
        Usuario.countDocuments( queryState )
    ])

    res.json({
        usuarios,
        total
    })
}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // guardar DB
    await usuario.save();

    res.status(201).json({
        usuario
    })
}

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO: validar contra base de datos
    if( password ) {
        // encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({ usuario });
}

const usuariosDelete = async(req, res) => {
    const { id } = req.params;

    // fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - contolador'
    })
}


module.exports = {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut,
}