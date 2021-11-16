import { Container } from 'typedi'
import { Router } from 'express'
import { UserController } from './user.controller'

const userController = Container.get(UserController)

const router = Router()

router.post('/', (req, res) => userController.createUser(req, res))
router.post('/login', (req, res) => userController.loginUser(req, res))

export default router