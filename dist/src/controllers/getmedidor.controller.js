"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdMedidor = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getIdMedidor = function (req, resp) {
    var cedula = req.params.cedula;
    var tipo = req.params.tipo;
    var sqlQuery = "\n    SELECT M.ID_MED\n    FROM usuarios U, medidores M\n    WHERE U.CED_USU = M.CED_USU_MED\n    AND U.CED_USU = ?\n    AND M.TIPO_MED = ?\n    ";
    connection_1.default.query(sqlQuery, [cedula, tipo], function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getIdMedidor = getIdMedidor;
