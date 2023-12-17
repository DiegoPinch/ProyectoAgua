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
exports.postFacturas = exports.putFacturaLectura = exports.putFacturas = exports.getFacturas = void 0;
var connection_1 = __importDefault(require("../db/connection"));
var getFacturas = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var cedula, sqlQuery, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cedula = req.params.cedula;
                sqlQuery = "\n  SELECT U.*, M.*, L.*, F.*\n  FROM usuarios U, medidores M, lecturas L, facturas F\n  WHERE U.CED_USU = M.CED_USU_MED\n  AND M.ID_MED = L.ID_MED_LEC\n  AND L.ID_LEC = F.ID_LEC_PER\n  AND F.EST_FACT = 'PENDIENTE'\n  AND U.CED_USU = ?\n  ";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.default.query(sqlQuery, [cedula], function (err, data) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    })];
            case 2:
                data = _a.sent();
                resp.json(data);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                resp.status(500).json({ error: 'Error al obtener facturas' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getFacturas = getFacturas;
var putFacturas = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fecha, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                fecha = req.params.fecha;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.default.query('UPDATE facturas SET FEC_PAGO = ?, EST_FACT = "PAGADO" WHERE ID_FACT = ?', [fecha, id], function (err, data) {
                            if (err) {
                                console.error('Error al editar la FACTURA', err);
                                reject(err);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    })];
            case 2:
                _a.sent();
                resp.json({
                    msg: "Factura editada con éxito"
                });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                resp.status(500).json({
                    error: 'Error al editar la FACTURA'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.putFacturas = putFacturas;
var putFacturaLectura = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var id, exceso, suma, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                exceso = req.params.exceso;
                suma = req.params.suma;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new Promise(function (resolve, reject) {
                        connection_1.default.query('UPDATE facturas SET EXC_LECTURA = ?, SUM_TOTAL = ? WHERE ID_LEC_PER = ?', [exceso, suma, id], function (err, data) {
                            if (err) {
                                console.error('Error al editar la FACTURA', err);
                                reject(err);
                            }
                            else {
                                resolve(data);
                            }
                        });
                    })];
            case 2:
                _a.sent();
                resp.json({
                    msg: "Factura editada con éxito"
                });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                resp.status(500).json({
                    error: 'Error al editar la FACTURA'
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.putFacturaLectura = putFacturaLectura;
var postFacturas = function (req, resp) { return __awaiter(void 0, void 0, void 0, function () {
    var body;
    return __generator(this, function (_a) {
        body = req.body;
        try {
            connection_1.default.query('INSERT INTO FACTURAS SET ?', [body], function (err, data) {
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
        }
        catch (err) {
            console.error('Error al insertar datos:', err);
            resp.status(500).json({
                error: 'Error al insertar datos en la base de datos',
            });
        }
        return [2 /*return*/];
    });
}); };
exports.postFacturas = postFacturas;
