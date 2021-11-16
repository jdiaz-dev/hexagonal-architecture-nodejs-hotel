import { Container } from 'typedi';
import { Router } from 'express';
import { check } from 'express-validator';

import { HoustingController } from './housting.controller';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';
import { validateFields } from '../../../../../shared/middlewares/validate-fields';
import { HoustingEntityMiddleware } from './middlewares/housting-entity.middleware';

const coommonMiddlewares = Container.get(CommonMiddlwares);
const houstingController = Container.get(HoustingController);
const bussinesLogicMiddlewares = Container.get(HoustingEntityMiddleware);

const router = Router();

router.post(
    '/:hotelId/:cashId/:clientId/:roomId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('moneyPaid', 'moneyPaid is required').not().isEmpty(),
        check('entryDate', 'entryDate is required').not().isEmpty(),
        check('entryTime', 'entryTime is required').not().isEmpty(),
        check('discountApplied', 'discountApplied is required').not().isEmpty(),
        validateFields,
    ],
    houstingController.createHousting,
);

router.get(
    '/:hotelId/:cashId/:roomId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        //bussinesLogicMiddlewares.checkIfHoustingDomainEntityIsCompliment,
        validateFields,
    ],
    houstingController.getHoustingByRoom,
);

router.put(
    '/:hotelId/:cashId/:houstingId/:clientId/:roomId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        bussinesLogicMiddlewares.checkIfHoustingDomainEntityIsCompliment,
        check('moneyToAdd', 'moneyToAdd is required').not().isEmpty(),
        validateFields,
    ],
    houstingController.updateMoneyPaid,
);

router.put(
    '/finish/:hotelId/:cashId/:houstingId/:clientId/:roomId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        bussinesLogicMiddlewares.checkIfHoustingDomainEntityIsCompliment,
        validateFields,
    ],
    houstingController.finishHousting,
);

export default router;
