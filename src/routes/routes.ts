import { Router } from 'express'
import { createItem } from '../controllers/testController'
import { notifyUser } from '../controllers/notification'

const router = Router()

router.post('/', createItem)
router.get('/notify', notifyUser)

export default router
