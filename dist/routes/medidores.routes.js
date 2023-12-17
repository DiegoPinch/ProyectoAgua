"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var medidores_controller_1 = require("../controllers/medidores.controller");
var router = (0, express_1.Router)();
router.get('/', medidores_controller_1.getMedidores);
router.get('/:id', medidores_controller_1.getMedidor);
router.get('/:id/:tipo', medidores_controller_1.getMedidorReptido);
router.put('/delete/:id', medidores_controller_1.deleteMedidor);
router.put('/update/:id', medidores_controller_1.putMedidor);
router.post('/', medidores_controller_1.postMedidor);
exports.default = router;
