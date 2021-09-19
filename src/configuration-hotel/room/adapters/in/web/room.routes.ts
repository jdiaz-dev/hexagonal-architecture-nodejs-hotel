import { Router } from 'express';
import { Container } from 'typedi';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';

import { RoomController } from './room.controller';
import { check } from 'express-validator';
import { validateFields } from '../../../../../shared/middlewares/validate-fields';
import { RoomMiddlewares } from './middlewares/room-middlwares';

const coommonMiddlewares = Container.get(CommonMiddlwares);
const roomMiddlewares = Container.get(RoomMiddlewares);

const roomController = Container.get(RoomController);
const router = Router();

router.post(
    '/:hotelId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('name', 'Name for room is required').not().isEmpty(),
        check('price', 'Price for room is required').not().isEmpty(),
        check('details', 'Details for room is required').not().isEmpty(),
        validateFields,
    ],
    roomController.createRoom,
);

router.get(
    '/:hotelId/:levelId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    roomController.getRoomsByLevel,
);

router.get('/:hotelId', [coommonMiddlewares.validateJWT, validateFields], roomController.getAllRooms);

//put
router.put(
    '/:hotelId/:levelId/:categoryId/:roomId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        check('name', 'Name for room is required').not().isEmpty(),
        check('price', 'Price for room is required').not().isEmpty(),
        check('details', 'Details for room is required').not().isEmpty(),
        validateFields,
    ],
    roomController.updateRoom,
);

router.put(
    '/:hotelId/:roomId/:roomConditionId',
    [
        coommonMiddlewares.validateJWT,
        coommonMiddlewares.checkIfHotelBelongsToUserApp,
        roomMiddlewares.checkIfRoomConditionExists,
        validateFields,
    ],
    roomController.updateConditionOfRoom,
);

//delete
router.delete(
    '/:hotelId/:levelId/:roomId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    roomController.removeRoom,
);

export default router;
