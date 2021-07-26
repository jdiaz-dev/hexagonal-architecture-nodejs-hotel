import { Router } from 'express'
import { Container } from 'typedi';
import { CommonMiddlwares } from '../../../../../common/middlewares/common-middlewares';

import { RoomController } from './room.controller';
import { check } from 'express-validator';
import { validateFields } from '../../../../../common/middlewares/validate-fields';
import { RoomMiddlewares } from './middlewares/room-middlwares';

const coommonMiddlewares = Container.get(CommonMiddlwares)
const roomMiddlewares = Container.get(RoomMiddlewares)

const roomController = Container.get(RoomController)
const router = Router()

router.get('/:hotelId/:levelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
], roomController.getRoomsByLevel)

router.post('/:hotelId/:levelId/:categoryId/:roomConditionId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    roomMiddlewares.checkIfRoomConditionExists,
    check('name', 'Name for room is required').not().isEmpty(),
    check('price', 'Price for room is required').not().isEmpty(),
    check('details', 'Details for room is required').not().isEmpty(),
    validateFields
], roomController.createRoom)


//put
router.put('/:hotelId/:levelId/:categoryId/:roomId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    check('name', 'Name for room is required').not().isEmpty(),
    check('price', 'Price for room is required').not().isEmpty(),
    check('details', 'Details for room is required').not().isEmpty(),
    validateFields
], roomController.updateRoom)

router.put('/:hotelId/:roomId/:roomConditionId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    roomMiddlewares.checkIfRoomConditionExists,
    validateFields
], roomController.updateConditionOfRoom)


//delete
router.delete('/:hotelId/:levelId/:roomId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToClientApp,
    validateFields
], roomController.removeRoom)

export default router