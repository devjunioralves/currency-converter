import { type Express } from 'express'
import { bodyParser } from '../middlewares/BodyParser'
import { contentType } from '../middlewares/ContentType'
import { cors } from '../middlewares/Cors'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}