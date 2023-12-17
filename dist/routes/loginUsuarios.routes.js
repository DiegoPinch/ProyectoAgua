"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var loginAdministracion_controller_1 = require("../controllers/loginAdministracion.controller");
var router = (0, express_1.Router)();
router.get('/:cedula/:contra', loginAdministracion_controller_1.loginUsuario);
exports.default = router;
