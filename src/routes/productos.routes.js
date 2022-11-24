import {Router} from 'express'
import { getProductos, createProductos, updateProducto, eliminarProducto } from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos', getProductos )

router.post('/productos', createProductos )

router.put('/productos', updateProducto )

router.delete('/productos', eliminarProducto )

export default router