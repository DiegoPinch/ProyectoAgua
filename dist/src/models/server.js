"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var persona_routes_1 = __importDefault(require("../routes/persona.routes"));
var medidor_routes_1 = __importDefault(require("../routes/medidor.routes"));
var peticiones_routes_1 = __importDefault(require("../routes/peticiones.routes"));
var getidMedidor_routes_1 = __importDefault(require("../routes/getidMedidor.routes"));
var getFacturas_routes_1 = __importDefault(require("../routes/getFacturas.routes"));
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
        this.app.use('/api/medidores', medidor_routes_1.default);
        this.app.use('/api/lec', peticiones_routes_1.default);
        this.app.use('/api/getidmedidor', getidMedidor_routes_1.default);
        this.app.use('/api/getfacturas', getFacturas_routes_1.default);
    };
    //para imprir json
    Server.prototype.middlewares = function () {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    };
    // conexion a bdd
    Server.prototype.conectarDB = function () {
        connection_1.default.connect(function (error) {
            if (error)
                throw error;
            console.log('conexion exitosa');
        });
    };
    return Server;
}());
exports.default = Server;
