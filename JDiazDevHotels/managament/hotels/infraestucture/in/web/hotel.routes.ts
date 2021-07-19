import { Container } from 'typedi'
import { Router } from 'express'
import { check } from 'express-validator'

import { HotelController } from './hotel.controller'
import { CommonMiddlwares } from '../../../../../common/middlewares/common-middlewares'
import { validateFields } from '../../../../../common/middlewares/validate-fields';

const coommonMiddlewares = Container.get(CommonMiddlwares)
const userController = Container.get(HotelController)

const router = Router()

router.post('/:clientId', [
    coommonMiddlewares.validateJWT,
    check('name', 'hotel name is required').not().isEmpty(),
    check('address', 'address hotel is required').not().isEmpty(),
    validateFields
],  userController.createHotel)

export default router

