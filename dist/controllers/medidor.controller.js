"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putLectura = exports.getLectura = exports.postLecturas = exports.getLecturaActual = exports.getPersonaMedidor = void 0;
var connection_1 = __importDefault(require("../db/connection"));
//para el buscar persona con medidor especificado
var getPersonaMedidor = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var tipo;
    return __generator(this, function (_a) {
        tipo = req.params.tipo;
        connection_1.default.query('SELECT U.*, M.* FROM usuarios U, medidores M WHERE U.CED_USU = M.CED_USU_MED AND M.TIPO_MED = ?', tipo, function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getPersonaMedidor = getPersonaMedidor;
var getLecturaActual = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var cedula, tipo, mes, sqlQuery;
    return __generator(this, function (_a) {
        cedula = req.params.cedula;
        tipo = req.params.tipo;
        mes = req.params.mes;
        sqlQuery = "\n    SELECT U.CED_USU, M.TIPO_MED, L.*\n    FROM usuarios U, medidores M, lecturas L\n    WHERE U.CED_USU = M.CED_USU_MED\n    AND M.ID_MED = L.ID_MED_LEC\n    AND U.CED_USU = ?\n    AND M.TIPO_MED = ?\n    AND L.MES_CON = ?\n  ";
        connection_1.default.query(sqlQuery, [cedula, tipo, mes], function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getLecturaActual = getLecturaActual;
var postLecturas = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = req.body;
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
        return [2 /*return*/];
    });
}); };
exports.postLecturas = postLecturas;
//obtener LA TBALE DE los datos de la lectura
var getLectura = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var tipo, mes, sqlQuery;
    return __generator(this, function (_a) {
        tipo = req.params.tipo;
        mes = req.params.mes;
        sqlQuery = "\n  SELECT U.*, M.TIPO_MED, L.*\n  FROM usuarios U, medidores M, lecturas L\n  WHERE U.CED_USU = M.CED_USU_MED\n  AND M.ID_MED = L.ID_MED_LEC\n  AND M.TIPO_MED = ?\n  AND L.MES_CON = ?\n  ";
        connection_1.default.query(sqlQuery, [tipo, mes], function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getLectura = getLectura;
var putLectura = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, lectura;
    return __generator(this, function (_a) {
        id = req.params.id;
        lectura = req.params.lectura;
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
        return [2 /*return*/];
    });
}); };
exports.putLectura = putLectura;
