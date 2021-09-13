import { Container } from 'typedi';
import { Router } from 'express';
import { check } from 'express-validator';

import { HoustingReportController } from './housting-report.controller';
import { CommonMiddlwares } from '../../../../../shared/middlewares/common-middlewares';
import { validateFields } from '../../../../../shared/middlewares/validate-fields';

const coommonMiddlewares = Container.get(CommonMiddlwares);
const houstingReportController = Container.get(HoustingReportController);

const router = Router();

router.get(
  '/:hotelId/:cashId/:houstingId',
  [coommonMiddlewares.validateJWT, validateFields],
  houstingReportController.getHoustingReport,
);

export default router;
