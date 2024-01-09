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
exports.eliminarTarifaAgua = exports.actualizarTarifaAgua = exports.crearTarifaAgua = exports.getTarifaAguaPorId = exports.getTarifasConsumo = exports.getTarifasRiego = exports.getTarifasAgua = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getTarifasAgua = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connection_1.default.query('SELECT * FROM TarifasAgua', function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getTarifasAgua = getTarifasAgua;
var getTarifasRiego = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connection_1.default.query('SELECT * FROM TarifasAgua WHERE tip_serv = "RIEGO"', function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getTarifasRiego = getTarifasRiego;
var getTarifasConsumo = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connection_1.default.query('SELECT * FROM TarifasAgua WHERE tip_serv = "CONSUMO"', function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getTarifasConsumo = getTarifasConsumo;
var getTarifaAguaPorId = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var tarifaId;
    return __generator(this, function (_a) {
        tarifaId = req.params.id;
        connection_1.default.query('SELECT * FROM TarifasAgua WHERE id = ?', tarifaId, function (err, data) {
            if (err)
                throw err;
            resp.json(data);
        });
        return [2 /*return*/];
    });
}); };
exports.getTarifaAguaPorId = getTarifaAguaPorId;
var crearTarifaAgua = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tipo_servicio, basico, exceso;
    return __generator(this, function (_b) {
        _a = req.body, tipo_servicio = _a.tipo_servicio, basico = _a.basico, exceso = _a.exceso;
        connection_1.default.query('INSERT INTO TarifasAgua (tip_serv, basico, exceso) VALUES (?, ?, ?)', [tipo_servicio, basico, exceso], function (err, data) {
            if (err)
                throw err;
            resp.json({ message: 'Tarifa de agua creada correctamente' });
        });
        return [2 /*return*/];
    });
}); };
exports.crearTarifaAgua = crearTarifaAgua;
var actualizarTarifaAgua = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var tarifaId, _a, basico, exceso, met_cubicos;
    return __generator(this, function (_b) {
        tarifaId = req.params.id;
        _a = req.body, basico = _a.basico, exceso = _a.exceso, met_cubicos = _a.met_cubicos;
        connection_1.default.query('UPDATE TarifasAgua SET basico = ?, exceso = ?, met_cubicos = ? WHERE id = ?', [basico, exceso, met_cubicos, tarifaId], function (err, data) {
            if (err)
                throw err;
            resp.json({ message: 'Tarifa de agua actualizada correctamente' });
        });
        return [2 /*return*/];
    });
}); };
exports.actualizarTarifaAgua = actualizarTarifaAgua;
var eliminarTarifaAgua = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var tarifaId;
    return __generator(this, function (_a) {
        tarifaId = req.params.id;
        connection_1.default.query('DELETE FROM TarifasAgua WHERE id = ?', tarifaId, function (err, data) {
            if (err)
                throw err;
            resp.json({ message: 'Tarifa de agua eliminada correctamente' });
        });
        return [2 /*return*/];
    });
}); };
exports.eliminarTarifaAgua = eliminarTarifaAgua;
