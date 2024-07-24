const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    const query = req.query;

    res.json({
        msg: 'get API - contolador',
        query
    })
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - contolador',
        id
    })
}

const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.status(201).json({
        msg: 'post API - contolador',
        body
    })
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - contolador'
    })
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