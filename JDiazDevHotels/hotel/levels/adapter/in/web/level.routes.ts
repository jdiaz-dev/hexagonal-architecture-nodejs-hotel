import { Router } from "express";
import { check } from "express-validator";
import Container from "typedi";

import { LevelController } from './level.controller';
import { validateFields } from "../../../../../common/middlewares/validate-fields";
import { CommonMiddlwares } from "../../../../../common/middlewares/common-middlewares";

const coommonMiddlewares = Container.get(CommonMiddlwares)

const levelController = Container.get(LevelController)
const router = Router()

router.post('/:hotelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    check('nameLevel', 'Name for level is required').not().isEmpty(),
    validateFields
], levelController.createLevel)

router.get('/:hotelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
], levelController.getLevelsOfHotel)

router.put('/:hotelId/:levelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    check('nameLevel', 'Name for level is required').not().isEmpty(),
    validateFields
], levelController.upateLevel)

router.delete('/:hotelId/:levelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
], levelController.removeLevel)


/* router.get('/level/:hotelLevelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
],levelController.getLevelOfHotel)
 */
export default router
