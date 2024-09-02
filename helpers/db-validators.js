const Role = require('../models/role');
const Usuario = require('../models/user');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }
}

const emailExiste = async( correo = '') => {
    // verificar si el correo existe
    const existEmail = await Usuario.findOne({ correo });

    if( existEmail ) {
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // verificar si el correo existe
    const existeUsuario = await Usuario.findById( id );

    if( !existeUsuario ) {
        throw new Error(`El id: ${ id } no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}