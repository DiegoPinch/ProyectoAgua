"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var peticionesget_controller_1 = require("../controllers/peticionesget.controller");
var router = (0, express_1.Router)();
router.get('/:id/:mes', peticionesget_controller_1.getIdLectura);
exports.default = router;
