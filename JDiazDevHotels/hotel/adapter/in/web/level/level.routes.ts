import { Router } from "express";
import { check } from "express-validator";
import Container from "typedi";

import { LevelController } from './level.controller';
import { validateFields } from "../../../../../common/helpers/validate-fields";
import { TokenHelper } from "../../../../../common/helpers/token-help";

const tokenHelper = Container.get(TokenHelper)

const levelController = Container.get(LevelController)
const router = Router()

router.post('/:hotelId', [
    tokenHelper.validateJWT,
    check('name', 'Name for level is required').not().isEmpty(),
    validateFields
],levelController.createLevel)

router.get('/:hotelId', [
    tokenHelper.validateJWT,
    validateFields
],levelController.getLevelsOfHotel)

router.get('/level/:hotelLevelId', [
    tokenHelper.validateJWT,
    validateFields
],levelController.getLevelOfHotel)

export default router
