"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const role_controller_1 = require("./../adapter/in/role.controller");
const rolesController = typedi_1.Container.get(role_controller_1.RoleController);
const router = express_1.Router();
router.post('/', (req, res) => rolesController.createRole(req, res));
exports.default = router;
//# sourceMappingURL=roles.routes.js.map