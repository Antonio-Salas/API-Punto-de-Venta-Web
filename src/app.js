import express from 'express'
import cors from 'cors'
import indexRoutes from './routes/index.routes.js'
import productosRoutes from './routes/productos.routes.js'
import registroRoutes from './routes/registro.routes.js'

const app = express()
app.use(cors())
app.use(express.json())


app.use(indexRoutes)
app.use('/api/', productosRoutes)
app.use('/api/', registroRoutes)

app.use((req,res, next) => {
    res.status(404).json({
        message: 'API not found'
    })
})

export default app;