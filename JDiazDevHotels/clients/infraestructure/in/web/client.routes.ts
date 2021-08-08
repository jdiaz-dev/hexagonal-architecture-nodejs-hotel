import { Container } from 'typedi'
import { Router } from 'express'
import { check } from 'express-validator'
import { CommonMiddlwares } from '../../../../common/middlewares/common-middlewares'
import { ClientController } from './client.controller'
import { validateFields } from '../../../../common/middlewares/validate-fields'

const coommonMiddlewares = Container.get(CommonMiddlwares)
const clientController = Container.get(ClientController)

const router = Router()

router.post('/:hotelId', [
    coommonMiddlewares.validateJWT,
    check('names', 'hotel name is required').not().isEmpty(),
    check('surnames', 'address hotel is required').not().isEmpty(),
    check('dni', 'address hotel is required').not().isEmpty(),
    check('cellphone', 'address hotel is required').not().isEmpty(),
    check('visitReason', 'address hotel is required').not().isEmpty(),
    validateFields
],  clientController.createClient)

router.get('/:hotelId/:clientId', [
    coommonMiddlewares.validateJWT,
    validateFields
],  clientController.getClient)

router.get('/:hotelId', [
    coommonMiddlewares.validateJWT,
    validateFields
],  clientController.getClients)

router.put('/:hotelId/:clientId', [
    coommonMiddlewares.validateJWT,
    check('names', 'hotel name is required').not().isEmpty(),
    check('surnames', 'address hotel is required').not().isEmpty(),
    check('dni', 'address hotel is required').not().isEmpty(),
    check('cellphone', 'address hotel is required').not().isEmpty(),
    check('visitReason', 'address hotel is required').not().isEmpty(),
    validateFields
],  clientController.updateClient)

export default router
