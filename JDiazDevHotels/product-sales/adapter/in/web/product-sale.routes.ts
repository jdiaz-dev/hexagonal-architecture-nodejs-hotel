import { Container } from 'typedi'
import { Router } from 'express'
import { check } from 'express-validator'

import { CommonMiddlwares } from '../../../../common/middlewares/common-middlewares'
import { validateFields } from '../../../../common/middlewares/validate-fields';
import { ProductSaledController } from './product-sale.controller';
import { ProductSaledMiddlewares } from './middlewares/products-saled.middlewares';

const coommonMiddlewares = Container.get(CommonMiddlwares)
const productsSaledMiddlewares = Container.get(ProductSaledMiddlewares)

const productSaledController = Container.get(ProductSaledController)

const router = Router()

router.post('/:hotelId/:cashId/:houstingId/:productId', [
    coommonMiddlewares.validateJWT,
    check('amount', 'amount is required').not().isEmpty(),
    check('date', 'date is required').not().isEmpty(),
    check('payed', 'payed is required').not().isEmpty(),
    validateFields
],  productSaledController.createProductsSaled )

router.put('/:hotelId/:cashId/:houstingId/:productSaledId', [
    coommonMiddlewares.validateJWT,
    productsSaledMiddlewares.checkIfProductsSaledRelationsIsCompliment,
    check('amount', 'amount is required').not().isEmpty(),
    check('payed', 'payed is required').not().isEmpty(),
    validateFields
],  productSaledController.updateAmountProductSaled )

router.put('/finish-payment/:hotelId/:cashId/:houstingId/:productSaledId', [
    coommonMiddlewares.validateJWT,
    productsSaledMiddlewares.checkIfProductsSaledRelationsIsCompliment,
    validateFields
],  productSaledController.updateProductSaledPayed )

export default router
