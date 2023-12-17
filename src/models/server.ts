import express, { Application } from 'express';
import routesPersonas from '../routes/persona.routes';
import routesLecturas from '../routes/lecturas.routes';
import routesgetFacturas from '../routes/Facturas.routes';
import impFacturas from '../facturas/facturaprueba.routes';
import getAdminstracion from '../routes/Login.routes';
import actas from '../routes/actas.routes';
import detalledirectivas from '../routes/detalle_directiva.routes';
import loginUsuario from '../routes/loginUsuarios.routes';
import medidores from '../routes/medidores.routes';
import connection from '../db/connection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        //this.routese();
        this.conectarDB();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Application corriendo en el puerto', this.app);
        });
    }
    routes() {
        this.app.use('/api/personas', routesPersonas)
        this.app.use('/api/lecturas', routesLecturas)
        this.app.use('/api/facturas', routesgetFacturas)
        this.app.use('/api/imp', impFacturas)
        this.app.use('/api/loginadministracion', getAdminstracion)
        this.app.use('/api/actas', actas)
        this.app.use('/api/detalledirectivas', detalledirectivas)
        this.app.use('/api/loginusuarios', loginUsuario) //login usuarios
        this.app.use('/api/medidores', medidores);
    }

    //para imprir json
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    // conexion a bdd
    conectarDB() {
        connection.connect((error) => {
            if (error) throw error;
            console.log('conexion exitosa');

        }
        );
    }

}
export default Server
