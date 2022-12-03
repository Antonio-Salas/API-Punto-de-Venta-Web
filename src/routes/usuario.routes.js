import {Router} from 'express'
import { getUsuario, createUsuario, updateUsuario, eliminarUsuario, getUsuarios } from '../controllers/usuario.controller.js'

const router = Router()

router.get('/usuarios', getUsuarios )

router.get('/usuarios/:id', getUsuario )

router.post('/usuarios', createUsuario )

router.patch('/usuarios/:id', updateUsuario )

router.delete('/usuarios/:id', eliminarUsuario )

export default router