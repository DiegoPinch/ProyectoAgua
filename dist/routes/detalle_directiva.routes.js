"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var detalle_directiva_controller_1 = require("../controllers/detalle_directiva.controller");
var router = (0, express_1.Router)();
router.get('/', detalle_directiva_controller_1.getDetalleDirectiva);
router.post('/', detalle_directiva_controller_1.postDetalleDirectiva);
router.delete('/:id', detalle_directiva_controller_1.deleteDetalleDirectiva);
//router.put('/:id', putPersona);
exports.default = router;
