const mongoose = require('mongoose');

const dbConnection = async() => {
    const urlDB = process.env.MONGODB_CNN;

    try {

        await mongoose.connect(urlDB);
        console.log('data base online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar DB');
    }
}

module.exports = {
    dbConnection
}