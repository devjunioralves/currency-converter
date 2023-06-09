import { Router, type Express } from "express"
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  fg.sync('**/src/main/routes/**Routes.ts').map(async file => (await import(`../../../${file}`)).default(router))
}