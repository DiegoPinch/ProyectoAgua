"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLecturaActual = exports.getPersonaMedidor = exports.putPersona = exports.postPersona = exports.deletePersona = exports.getPersona = exports.getPersonas = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getPersonas = function (req, resp) {
    connection_1.default.query('SELECT * FROM USUARIOS WHERE ESTADO = "Activo"', function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getPersonas = getPersonas;
var getPersona = function (req, resp) {
    var id = req.params.id;
    connection_1.default.query('SELECT * FROM USUARIOS WHERE CED_USU = ?', id, function (err, data) {
        if (err)
            throw err;
        resp.json(data[0]);
    });
};
exports.getPersona = getPersona;
var deletePersona = function (req, resp) {
    var id = req.params.id;
    connection_1.default.query('DELETE FROM USUARIOS WHERE CED_USU = ?', id, function (err, data) {
        if (err)
            throw err;
        resp.json({
            msg: "Eliminado con exito"
        });
    });
};
exports.deletePersona = deletePersona;
var postPersona = function (req, resp) {
    var body = req.body;
    connection_1.default.query('INSERT INTO USUARIOS SET ?', [body], function (err, data) {
        if (err) {
            console.error('Error al insertar datos:', err);
            resp.status(500).json({
                error: 'Error al insertar datos en la base de datos',
            });
        }
        else {
            resp.status(200).json({
                msg: 'Datos insertados con éxito',
            });
        }
    });
};
exports.postPersona = postPersona;
var putPersona = function (req, resp) {
    var id = req.params.id; // ID de la persona a editar
    var body = req.body; // Datos actualizados
    connection_1.default.query('UPDATE USUARIOS SET ? WHERE CED_USU = ?', [body, id], function (err, data) {
        if (err) {
            console.error('Error al editar la persona', err);
            resp.status(500).json({
                error: 'Error al editar la persona'
            });
        }
        else {
            resp.json({
                msg: "Editada con éxito"
            });
        }
    });
};
exports.putPersona = putPersona;
//para el buscar persona con medidor especificado
var getPersonaMedidor = function (req, resp) {
    var tipo = req.params.tipo;
    connection_1.default.query('SELECT U.*, M.* FROM usuarios U, medidores M WHERE U.CED_USU = M.CED_USU_MED AND M.TIPO_MED = ?', tipo, function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getPersonaMedidor = getPersonaMedidor;
var getLecturaActual = function (req, resp) {
    var cedula = req.params.cedula;
    var tipo = req.params.tipo;
    var mes = req.params.mes;
    var sqlQuery = "\n    SELECT U.CED_USU, M.TIPO_MED, L.MES_CON, L.*\n    FROM usuarios U, medidores M, lecturas L\n    WHERE U.CED_USU = M.CED_USU_MED\n    AND M.ID_MED = L.ID_MED_LEC\n    AND U.CED_USU = ?\n    AND M.TIPO_MED = ?\n    AND L.MES_CON = ?\n  ";
    connection_1.default.query(sqlQuery, [cedula, tipo, mes], function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getLecturaActual = getLecturaActual;
