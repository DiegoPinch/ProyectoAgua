"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Facturas_controller_1 = require("../controllers/Facturas.controller");
var router = (0, express_1.Router)();
router.get('/:cedula', Facturas_controller_1.getFacturas);
router.put('/:fecha/:id', Facturas_controller_1.putFacturas);
exports.default = router;
