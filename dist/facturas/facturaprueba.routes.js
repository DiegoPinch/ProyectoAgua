"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var facturasPDF_controller_1 = require("../controllers/facturasPDF.controller");
var router = (0, express_1.Router)();
// Ruta para generar la factura con parámetros
router.get('/generar-factura/:cedulaUsuario/:mes/:tipo', facturasPDF_controller_1.generarFactura);
exports.default = router;
