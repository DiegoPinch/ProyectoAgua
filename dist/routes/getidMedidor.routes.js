"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getmedidor_controller_1 = require("../controllers/getmedidor.controller");
var router = (0, express_1.Router)();
router.get('/:cedula/:tipo', getmedidor_controller_1.getIdMedidor);
exports.default = router;
