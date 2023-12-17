"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFacturas = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getFacturas = function (req, resp) {
    var mes = req.params.mes;
    var tipo = req.params.tipo;
    var sqlQuery = "\n    SELECT U.*, M.*, L.*, F.*\n    FROM usuarios U, medidores M, lecturas L, facturas F\n    WHERE U.CED_USU = M.CED_USU_MED\n    AND M.ID_MED = L.ID_MED_LEC\n    AND L.ID_LEC = F.ID_LEC_PER\n    AND L.MES_CON = ?\n\tAND M.TIPO_MED = ?\n    ";
    connection_1.default.query(sqlQuery, [mes, tipo], function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getFacturas = getFacturas;
