import express from 'express'
import setupRoutes from './Routes'
import setupMiddlewares from './Middlewares'

const app = express()
setupMiddlewares(app)
setupRoutes(app)

export default app