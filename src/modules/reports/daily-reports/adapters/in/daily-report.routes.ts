import { Container } from 'typedi';
import { Router } from 'express';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';
import { validateFields } from '../../../../../shared/middlewares/validate-fields';
import { DailyReportController } from './daily-report.controller';

const coommonMiddlewares = Container.get(CommonMiddlwares);

const productSaledController = Container.get(DailyReportController);

const router = Router();

router.get(
    '/:hotelId/:cashId',
    [coommonMiddlewares.validateJWT, coommonMiddlewares.checkIfHotelBelongsToUserApp, validateFields],
    productSaledController.getDailyReport,
);

export default router;
