import { Container } from 'typedi'
import { Router } from 'express'
import { HotelController } from '../adapter/in/web/create-user.controller'

const userController = Container.get(HotelController)

const router = Router()

router.post('/', (req, res) => userController.createHotel(req, res))

export default router

