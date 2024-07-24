const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/user';

        // middlewares
        this.middlewares();

        // rutas de la aplicación
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors());

        // Lectura y parseo del body
        this.app.use( express.json());

        // directorio público
        this.app.use( express.static('public'));
    }

    routes() {
        
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen()  {
        this.app.listen(this.port, () => {
            console.log(`REST Server run ---> ${ this.port }`);
        })
    }
}

module.exports = Server;
