import {Router} from 'express'
import { getUsuario, createUsuario, updateUsuario, eliminarUsuario, getUsuarios } from '../controllers/registro.controller.js'

const router = Router()

router.get('/registros', getUsuarios )

router.get('/registro/:id', getUsuario )

router.post('/registro', createUsuario )

router.patch('/registro/:id', updateUsuario )

router.delete('/registro/:id', eliminarUsuario )

export default router