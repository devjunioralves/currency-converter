import express from 'express'
import setupRoutes from './Routes'

const app = express()
setupRoutes(app)

export default app