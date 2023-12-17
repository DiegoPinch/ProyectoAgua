"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdLectura = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getIdLectura = function (req, resp) {
    var id = req.params.id;
    var mes = req.params.mes;
    var sqlQuery = "\n    SELECT ID_LEC FROM LECTURAS\n    WHERE ID_MED_LEC= ?\n    AND MES_CON = ?\n    ";
    connection_1.default.query(sqlQuery, [id, mes], function (err, data) {
        if (err)
            throw err;
        resp.json(data);
    });
};
exports.getIdLectura = getIdLectura;
