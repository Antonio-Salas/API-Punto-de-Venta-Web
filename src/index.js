import express from 'express'
import indexRoutes from './routes/index.routes.js'
import productosRoutes from './routes/productos.routes.js'

const app = express()

app.use(indexRoutes)
app.use(productosRoutes)

app.listen(3000)