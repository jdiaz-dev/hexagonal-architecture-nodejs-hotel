"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const user_controller_1 = require("../adapter/in/user.controller");
const userController = typedi_1.Container.get(user_controller_1.UserController);
const router = express_1.Router();
router.post('/', (req, res) => userController.createUser(req, res));
router.post('/login', (req, res) => userController.loginUser(req, res));
exports.default = router;
//# sourceMappingURL=users.routes.js.map