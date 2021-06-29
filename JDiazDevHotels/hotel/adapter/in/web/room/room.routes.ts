import { Router } from 'express'
import { Container } from 'typedi';
import { TokenHelper } from '../../../../../common/helpers/token-help';

import { RoomController } from './room.controller';
import { check } from 'express-validator';
import { validateFields } from './../../../../../common/helpers/validate-fields';

const tokenHelper = Container.get(TokenHelper)

const roomController = Container.get(RoomController)
const router = Router()

router.post('/category/:hotelId', [
    tokenHelper.validateJWT,
    check('nameCategory', 'Name for room category is required').not().isEmpty(),
    validateFields
], roomController.createRoomCategory )

router.post('/condition', [
    tokenHelper.validateJWT,
    check('nameCondition', 'Name for room condition is required').not().isEmpty(),
    validateFields
], roomController.createRoomCondition )

router.post('/:hotelId/:levelId/:categoryId', [
    tokenHelper.validateJWT,
    check('name', 'Name for room is required').not().isEmpty(),
    check('price', 'Price for room is required').not().isEmpty(),
    check('details', 'Details for room is required').not().isEmpty(),
    validateFields
], roomController.createRoom )

router.put('/:hotelId/:levelId/:categoryId/:roomId', [
    tokenHelper.validateJWT,
    check('name', 'Name for room is required').not().isEmpty(),
    check('price', 'Price for room is required').not().isEmpty(),
    check('details', 'Details for room is required').not().isEmpty(),
    validateFields
], roomController.updateRoom )

router.get('/:levelId', [
    tokenHelper.validateJWT,
    validateFields
], roomController.getRooms )

export default router

