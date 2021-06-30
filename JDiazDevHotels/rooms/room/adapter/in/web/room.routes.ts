import { Router } from 'express'
import { Container } from 'typedi';
import { CommonMiddlwares } from '../../../../../common/middlewares/common-middlewares';

import { RoomController } from './room.controller';
import { check } from 'express-validator';
import { validateFields } from '../../../../../common/middlewares/validate-fields';

const coommonMiddlewares = Container.get(CommonMiddlwares)

const roomController = Container.get(RoomController)
const router = Router()

router.get('/:hotelId/:levelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
], roomController.getRooms )

router.post('/:hotelId/:levelId/:categoryId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    check('name', 'Name for room is required').not().isEmpty(),
    check('price', 'Price for room is required').not().isEmpty(),
    check('details', 'Details for room is required').not().isEmpty(),
    validateFields
], roomController.createRoom )

router.put('/:hotelId/:levelId/:categoryId/:roomId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    check('name', 'Name for room is required').not().isEmpty(),
    check('price', 'Price for room is required').not().isEmpty(),
    check('details', 'Details for room is required').not().isEmpty(),
    validateFields
], roomController.updateRoom )

router.delete('/:hotelId/:levelId/:roomId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
], roomController.removeRoom )

export default router