import { Container } from 'typedi'
import { Router } from 'express'
import { check } from 'express-validator'

import { HoustingController } from './housting.controller'
import { CommonMiddlwares } from '../../../../common/middlewares/common-middlewares'
import { validateFields } from '../../../../common/middlewares/validate-fields'


const coommonMiddlewares = Container.get(CommonMiddlwares)
const houstingController = Container.get(HoustingController)

const router = Router()

router.post('/:hotelId/:cashId/:clientId/:roomId', [
    coommonMiddlewares.validateJWT,
    check('price', 'pricey is required').not().isEmpty(),
    check('moneyPaid', 'moneyPaid is required').not().isEmpty(),
    check('entryDate', 'entryDate is required').not().isEmpty(),
    validateFields
],  houstingController.createHousting)

router.get('/:hotelId/:houstingId/:cashId/:clientId/:roomId', [
    coommonMiddlewares.validateJWT,
    validateFields
],  houstingController.getHousting)

export default router
