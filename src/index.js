import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import productosRoutes from './routes/productos.routes.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use(indexRoutes)
app.use('/api/', productosRoutes)

app.listen(3000)