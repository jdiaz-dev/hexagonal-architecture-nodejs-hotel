import { Container } from 'typedi';
import { Router } from 'express';
import { check } from 'express-validator';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';
import { ClientController } from './client.controller';
import { validateFields } from '../../../../../shared/middlewares/validate-fields';

const coommonMiddlewares = Container.get(CommonMiddlwares);
const clientController = Container.get(ClientController);

const router = Router();

router.post(
    '/:hotelId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('names', 'client names is required').not().isEmpty(),
        check('surnames', 'client surnames is required').not().isEmpty(),
        //check('dni', 'address hotel is required').not().isEmpty(),
        //check('cellphone', 'address hotel is required').not().isEmpty(),
        //check('visitReason', 'address hotel is required').not().isEmpty(),
        validateFields,
    ],
    clientController.createClient,
);

router.get(
    '/:hotelId/:clientId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    clientController.getClient,
);

router.get(
    '/:hotelId',
    //[coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    clientController.getClients,
);

router.put(
    '/:hotelId/:clientId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('names', 'hotel name is required').not().isEmpty(),
        check('surnames', 'address hotel is required').not().isEmpty(),
        check('dni', 'address hotel is required').not().isEmpty(),
        check('cellphone', 'address hotel is required').not().isEmpty(),
        check('visitReason', 'address hotel is required').not().isEmpty(),
        validateFields,
    ],
    clientController.updateClient,
);

export default router;
