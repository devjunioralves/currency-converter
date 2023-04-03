import { makeAddConversionController } from '@/main/factories/Conversion'
import { type Router } from 'express'
import { adaptRoute } from '../adapters/ExpressAdaptRoute'

export default (router: Router): void => {
  router.post('/conversion', adaptRoute(makeAddConversionController()))
}