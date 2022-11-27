import {Router} from 'express'
import { getProductos, createProductos, updateProducto, eliminarProducto, getProducto } from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos', getProductos )

router.get('/productos/:id', getProducto )

router.post('/productos', createProductos )

router.put('/productos/:id', updateProducto )

router.delete('/productos/:id', eliminarProducto )

export default router