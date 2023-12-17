"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putLectura = exports.getLectura = exports.postLecturas = exports.getLecturaActual = exports.getPersonaMedidor = void 0;
var connection_1 = __importDefault(require("../db/connection"));
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
    var sqlQuery = "\n    SELECT U.CED_USU, M.TIPO_MED, L.*\n    FROM usuarios U, medidores M, lecturas L\n    WHERE U.CED_USU = M.CED_USU_MED\n    AND M.ID_MED = L.ID_MED_LEC\n    AND U.CED_USU = ?\n    AND M.TIPO_MED = ?\n    AND L.MES_CON = ?\n  ";
    connection_1.default.query(sqlQuery, [cedula, tipo, mes], function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getLecturaActual = getLecturaActual;
var postLecturas = function (req, resp) {
    var body = req.body;
    connection_1.default.query('INSERT INTO LECTURAS SET ?', [body], function (err, data) {
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
exports.postLecturas = postLecturas;
//obtener LA TBALE DE los datos de la lectura
var getLectura = function (req, resp) {
    var tipo = req.params.tipo;
    var mes = req.params.mes;
    var sqlQuery = "\n  SELECT U.*, M.TIPO_MED, L.*\n  FROM usuarios U, medidores M, lecturas L\n  WHERE U.CED_USU = M.CED_USU_MED\n  AND M.ID_MED = L.ID_MED_LEC\n  AND M.TIPO_MED = ?\n  AND L.MES_CON = ?\n  ";
    connection_1.default.query(sqlQuery, [tipo, mes], function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getLectura = getLectura;
var putLectura = function (req, resp) {
    var id = req.params.id; // ID de la persona a editar
    var lectura = req.params.lectura; // Nuevo valor para LEC_ACT
    connection_1.default.query('UPDATE LECTURAS SET LEC_ACT = ? WHERE ID_LEC = ?', [lectura, id], function (err, data) {
        if (err) {
            console.error('Error al editar la lectura', err);
            resp.status(500).json({
                error: 'Error al editar la lectura'
            });
        }
        else {
            resp.json({
                msg: "Editada con éxito"
            });
        }
    });
};
exports.putLectura = putLectura;
