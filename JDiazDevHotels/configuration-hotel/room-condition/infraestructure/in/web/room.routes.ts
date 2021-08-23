import { Router } from 'express'
import { Container } from 'typedi';
import { CommonMiddlwares } from '../../../../../common/middlewares/common-middlewares';

import { RoomConditionController } from './room.controller';
import { check } from 'express-validator';
import { validateFields } from '../../../../../common/middlewares/validate-fields';

const coommonMiddlewares = Container.get(CommonMiddlwares)

const roomConditionController = Container.get(RoomConditionController)
const router = Router()

router.post('', [
    coommonMiddlewares.validateJWT,
    check('nameCondition', 'Name for room condition is required').not().isEmpty(),
    validateFields
], roomConditionController.createRoomCondition )

export default router

