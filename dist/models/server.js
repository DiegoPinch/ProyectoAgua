"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var persona_routes_1 = __importDefault(require("../routes/persona.routes"));
var lecturas_routes_1 = __importDefault(require("../routes/lecturas.routes"));
var Facturas_routes_1 = __importDefault(require("../routes/Facturas.routes"));
var facturaprueba_routes_1 = __importDefault(require("../facturas/facturaprueba.routes"));
var Login_routes_1 = __importDefault(require("../routes/Login.routes"));
var actas_routes_1 = __importDefault(require("../routes/actas.routes"));
var detalle_directiva_routes_1 = __importDefault(require("../routes/detalle_directiva.routes"));
var loginUsuarios_routes_1 = __importDefault(require("../routes/loginUsuarios.routes"));
var medidores_routes_1 = __importDefault(require("../routes/medidores.routes"));
var connection_1 = __importDefault(require("../db/connection"));
var cors_1 = __importDefault(require("cors"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.middlewares();
        this.routes();
        //this.routese();
        this.conectarDB();
    }
    Server.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log('Application corriendo en el puerto', _this.app);
        });
    };
    Server.prototype.routes = function () {
        this.app.use('/api/personas', persona_routes_1.default);
        this.app.use('/api/lecturas', lecturas_routes_1.default);
        this.app.use('/api/facturas', Facturas_routes_1.default);
        this.app.use('/api/imp', facturaprueba_routes_1.default);
        this.app.use('/api/loginadministracion', Login_routes_1.default);
        this.app.use('/api/actas', actas_routes_1.default);
        this.app.use('/api/detalledirectivas', detalle_directiva_routes_1.default);
        this.app.use('/api/loginusuarios', loginUsuarios_routes_1.default); //login usuarios
        this.app.use('/api/medidores', medidores_routes_1.default);
    };
    //para imprir json
    Server.prototype.middlewares = function () {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    };
    // conexion a bdd
    Server.prototype.conectarDB = function () {
        connection_1.default.getConnection(function (error, connection) {
            if (error) {
                throw error;
            }
            else {
                console.log('Conexión exitosa');
                connection.release();
            }
        });
    };
    return Server;
}());
exports.default = Server;
