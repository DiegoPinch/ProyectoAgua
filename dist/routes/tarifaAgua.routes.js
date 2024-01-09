"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var tarifaAgua_controller_1 = require("../controllers/tarifaAgua.controller");
var router = (0, express_1.Router)();
router.get('/consumo', tarifaAgua_controller_1.getTarifasConsumo);
router.get('/riego', tarifaAgua_controller_1.getTarifasRiego);
router.get('/', tarifaAgua_controller_1.getTarifasAgua);
router.get('/:id', tarifaAgua_controller_1.getTarifaAguaPorId);
router.post('/', tarifaAgua_controller_1.crearTarifaAgua);
router.put('/:id', tarifaAgua_controller_1.actualizarTarifaAgua);
router.delete('/:id', tarifaAgua_controller_1.eliminarTarifaAgua);
exports.default = router;