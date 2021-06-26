import { Container } from 'typedi'
import { Router } from 'express'
import { HotelController } from '../adapter/in/web/hotel.controller'
import { TokenHelp } from '../../common/token/token-help'

const tokenHelp = Container.get(TokenHelp)
const userController = Container.get(HotelController)

const router = Router()

router.post('/', [
    tokenHelp.validateJWT
],  userController.createHotel)

export default router

