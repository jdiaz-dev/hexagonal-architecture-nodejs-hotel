import { Container } from 'typedi'
import { Router } from 'express'
import { check } from 'express-validator'

import { HotelController } from './hotel.controller'
import { TokenHelper } from '../../../../../common/helpers/token-help'
import { validateFields } from './../../../../../common/helpers/validate-fields';

const tokenHelper = Container.get(TokenHelper)
const userController = Container.get(HotelController)

const router = Router()

router.post('/:clientId', [
    tokenHelper.validateJWT,
    check('name', 'hotel name is required').not().isEmpty(),
    check('address', 'address hotel is required').not().isEmpty(),
    validateFields
],  userController.createHotel)

export default router

