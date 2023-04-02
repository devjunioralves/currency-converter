import express from 'express'
import setupRoutes from './Routes'
import setupMiddlewares from './Middlewares'

const app = express()
setupRoutes(app)
setupMiddlewares(app)

export default app