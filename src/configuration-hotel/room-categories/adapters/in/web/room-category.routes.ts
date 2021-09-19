import { Router } from 'express';
import { Container } from 'typedi';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';
import { check } from 'express-validator';

import { validateFields } from '../../../../../shared/middlewares/validate-fields';
import { RoomCategoryController } from './room-category.controller';

const coommonMiddlewares = Container.get(CommonMiddlwares);

const roomCategoryController = Container.get(RoomCategoryController);
const router = Router();

router.post(
    '/:hotelId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('nameCategory', 'Name for room category is required').not().isEmpty(),
        validateFields,
    ],
    roomCategoryController.createRoomCategory,
);

router.get(
    '/:hotelId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    roomCategoryController.getRoomCategories,
);

router.put(
    '/:hotelId/:roomCategoryId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('nameCategory', 'Name for room category is required').not().isEmpty(),
        validateFields,
    ],
    roomCategoryController.updateRoomCategory,
);

router.delete(
    '/:hotelId/:roomCategoryId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    roomCategoryController.removeRoomCategory,
);

export default router;
