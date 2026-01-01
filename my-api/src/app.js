import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import corsOptions from './config/cors.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/users.routes.js'
import movieRoutes from './routes/movies.routes.js'
import errorHandler from './middleware/error.js'

const app = express()

app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/movies', movieRoutes)

app.use(errorHandler)

export default app
