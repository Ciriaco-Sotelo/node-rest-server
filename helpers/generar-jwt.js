const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => {

    //* que funcione en base a promesas por que funciona con call backs
    return new Promise(( resolve, reject ) => {

        const payload = { uid }
        const secretKey = process.env.SECRETORPRIVATEKEY;

        jwt.sign( payload, secretKey, {
            expiresIn: '4h'
        }, ( err, token ) => {

            if(err) {
                console.log(err);
                reject('No se pudo generar el JWT')
            } else {
                resolve( token );
            }

        })
    })
}

module.exports = {
    generarJWT
}