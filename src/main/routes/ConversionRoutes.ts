import { makeAddConversionController } from '@/main/factories/AddConversion'
import { type Router } from 'express'
import { adaptRoute } from '../adapters/ExpressAdaptRoute'
import { makeListConversionController } from '../factories/ListConversion'

export default (router: Router): void => {
  router.post('/conversion', adaptRoute(makeAddConversionController()))
  router.get('/conversion', adaptRoute(makeListConversionController()))
}