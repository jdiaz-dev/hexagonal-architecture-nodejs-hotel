import { Container } from 'typedi';
import { Router } from 'express';
import { check } from 'express-validator';

import { CashController } from './cash.controller';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';
import { validateFields } from '../../../../../shared/middlewares/validate-fields';

const coommonMiddlewares = Container.get(CommonMiddlwares);
const cashController = Container.get(CashController);

const router = Router();

router.post(
    '/:hotelId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('openingMoney', 'opening money is required').not().isEmpty(),
        check('date', 'date is required').not().isEmpty(),
        check('time', 'time is required').not().isEmpty(),
        validateFields,
    ],
    cashController.createCash,
);

router.get(
    '/:hotelId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    cashController.getCashNotClosed,
);

router.get(
    '/report/:hotelId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    cashController.getCashWithDailyReport,
);

router.patch(
    '/:hotelId/:cashId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    cashController.closeCash,
);

export default router;
