"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getFacturas_controller_1 = require("../controllers/getFacturas.controller");
var router = (0, express_1.Router)();
router.get('/:mes/:tipo', getFacturas_controller_1.getFacturas);
exports.default = router;
