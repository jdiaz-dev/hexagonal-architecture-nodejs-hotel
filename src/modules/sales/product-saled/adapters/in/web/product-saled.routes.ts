import { Container } from 'typedi';
import { Router } from 'express';
import { check, body } from 'express-validator';

import { CommonMiddlwares } from '../../../../../../shared/middlewares/common-middlewares';
import { validateFields } from '../../../../../../shared/middlewares/validate-fields';
import { ProductSaledController } from './product-saled.controller';
import { ProductSaledMiddlewares } from './middlewares/products-saled.middlewares';

const coommonMiddlewares = Container.get(CommonMiddlwares);
const productsSaledMiddlewares = Container.get(ProductSaledMiddlewares);

const productSaledController = Container.get(ProductSaledController);

const router = Router();

router.post(
    '/:hotelId/:cashId/:houstingId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('productsSaled.*.productId', 'product id is required').not().isEmpty(),
        check('productsSaled.*.amount', 'amount is required').not().isEmpty(),
        check('productsSaled.*.date', 'date is required').not().isEmpty(),
        check('productsSaled.*.time', 'time is required').not().isEmpty(),
        check('productsSaled.*.payed', 'payed is required').not().isEmpty(),
        validateFields,
    ],
    productSaledController.createProductSaled,
);

router.get(
    '/:hotelId/:houstingId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    productSaledController.getProductsSaled,
);

router.get(
    '/report/:hotelId/:cashId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    productSaledController.getProductsSaledForReport,
);

/* router.put(
    '/:hotelId/:cashId/:houstingId/:productSaledId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        productsSaledMiddlewares.checkIfProductsSaledRelationsIsCompliment,
        check('amount', 'amount is required').not().isEmpty(),
        check('payed', 'payed is required').not().isEmpty(),
        validateFields,
    ],
    productSaledController.updateAmountProductSaled,
); */

router.put(
    '/finish-payment/:hotelId/:cashId/:houstingId/:productSaledIds',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        //productsSaledMiddlewares.checkIfProductsSaledRelationsIsCompliment, //horror
        validateFields,
    ],
    productSaledController.completeProductSaledPayment,
);

export default router;
