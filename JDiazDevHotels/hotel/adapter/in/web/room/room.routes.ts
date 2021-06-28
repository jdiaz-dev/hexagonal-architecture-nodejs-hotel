import { Router } from 'express'
import { Container } from 'typedi';
import { TokenHelper } from '../../../../../common/helpers/token-help';

import { RoomController } from './room.controller';
import { check } from 'express-validator';
import { validateFields } from './../../../../../common/helpers/validate-fields';

const tokenHelper = Container.get(TokenHelper)

const roomController = Container.get(RoomController)
const router = Router()

router.post('/', [
    tokenHelper.validateJWT,
    check('nameCategory', 'Name for room category is required').not().isEmpty(),
    validateFields
], roomController.createRoomCategory )

router.post('/', [
    tokenHelper.validateJWT,
    check('nameCondition', 'Name for room condition is required').not().isEmpty(),
    validateFields
], roomController.createRoomCondition )


export default router

