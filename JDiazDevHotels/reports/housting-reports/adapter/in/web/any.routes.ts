import { Container } from 'typedi'
import { Router } from 'express'
import { check } from 'express-validator'

/* 
import { CashController } from './cash.controller'
import { CommonMiddlwares } from '../../../../common/middlewares/common-middlewares'
import { validateFields } from '../../../../common/middlewares/validate-fields'


const coommonMiddlewares = Container.get(CommonMiddlwares)
const cashController = Container.get(CashController)

const router = Router()

router.post('/:hotelId', [
    coommonMiddlewares.validateJWT,
    check('openingMoney', 'opening money is required').not().isEmpty(),
    validateFields
],  cashController.createCash)

export default router
 */
