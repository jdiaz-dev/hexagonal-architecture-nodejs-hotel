import { Router } from 'express';
import { check } from 'express-validator';
import Container from 'typedi';

import { LevelController } from './level.controller';
import { validateFields } from '../../../../../../shared/middlewares/validate-fields';
import { CommonMiddlwares } from '../../../../../../shared/middlewares/common-middlewares';

const coommonMiddlewares = Container.get(CommonMiddlwares);

const levelController = Container.get(LevelController);
const router = Router();

router.post(
    '/:hotelId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('numberLevel', 'Number for level is required').not().isEmpty(),
        check('nameLevel', 'Name for level is required').not().isEmpty(),
        validateFields,
    ],
    levelController.createLevel,
);

router.get(
    '/:hotelId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    levelController.getLevelsOfHotel,
);

router.put(
    '/:hotelId/:levelId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('numberLevel', 'Number for level is required').not().isEmpty(),
        check('nameLevel', 'Name for level is required').not().isEmpty(),
        validateFields,
    ],
    levelController.upateLevel,
);

router.delete(
    '/:hotelId/:levelId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    levelController.removeLevel,
);

/* router.get('/level/:hotelLevelId', [
    coommonMiddlewares.validateJWT,
    coommonMiddlewares.checkIfHotelBelongsToUserApp,
    validateFields
],levelController.getLevelOfHotel)
 */
export default router;
