"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const express_1 = require("express");
const hotel_controller_1 = require("../adapter/in/web/hotel.controller");
const token_help_1 = require("../../common/token/token-help");
const tokenHelp = typedi_1.Container.get(token_help_1.TokenHelp);
const userController = typedi_1.Container.get(hotel_controller_1.HotelController);
const router = express_1.Router();
router.post('/', [
    tokenHelp.validateJWT
], userController.createHotel);
exports.default = router;
//# sourceMappingURL=hotel.routes.js.map