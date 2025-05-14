import { Router } from 'express'
import { createItem } from '../controllers/testController'

const router = Router()

router.post('/', createItem)

export default router
