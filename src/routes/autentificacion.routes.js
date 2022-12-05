import {Router} from 'express'
import { getAutentificacion } from '../controllers/autentificacion.controller.js'

const router = Router()


router.get('/autenficicacion', getAutentificacion )

export default router