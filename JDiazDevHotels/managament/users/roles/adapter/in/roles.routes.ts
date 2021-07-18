import { Container } from 'typedi'
import { Router } from 'express'
import { RoleController } from './role.controller';

const rolesController = Container.get(RoleController)
const router = Router()

router.post('/', (req, res) => rolesController.createRole(req, res))

export default router
