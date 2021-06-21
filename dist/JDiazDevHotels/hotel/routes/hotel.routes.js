"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const create_user_controller_1 = require("../adapter/in/web/create-user.controller");
const userController = typedi_1.Container.get(create_user_controller_1.HotelController);
const router = express_1.Router();
router.post('/', (req, res) => userController.createHotel(req, res));
exports.default = router;
//# sourceMappingURL=hotel.routes.js.map