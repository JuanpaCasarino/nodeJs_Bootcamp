import {Router} from 'express'

const router = Router()

import { getGeneral } from '../controllers/views.controller.js'

router.get('/', getGeneral)

export default router