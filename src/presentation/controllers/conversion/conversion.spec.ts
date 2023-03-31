import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { MissingParamError } from '@/presentation/errors/MissingParamError'
import { badRequest } from '@/presentation/helpers/HttpHelper'
import { ConversionController } from './Conversion'

describe('Conversion Controller', () => {
  it('Should return 400 if no currency origin is provided', async () => {
    const conversionController = new ConversionController()
    const httpResponse = await conversionController.handle({
      body: {
        value: 1,
        to: 'BRL'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('from')))
  })

  it('Should return 400 if no currency destination is provided', async () => {
    const conversionController = new ConversionController()
    const httpResponse = await conversionController.handle({
      body: {
        value: 1,
        from:'USD'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('to')))
  })

  it('Should return 400 if no value is provided', async () => {
    const conversionController = new ConversionController()
    const httpResponse = await conversionController.handle({
      body: {
        from:'USD',
        to:'BRL'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('value')))
  })

  it('Should return 400 if invalid currency origin is provided', async () => {
    const conversionController = new ConversionController()
    const httpResponse = await conversionController.handle({
      body: {
        from:'BTC',
        to:'BRL',
        value: 1
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('from')))
  })

  it('Should return 400 if invalid currency destination is provided', async () => {
    const conversionController = new ConversionController()
    const httpResponse = await conversionController.handle({
      body: {
        from:'USD',
        to:'BTC',
        value: 1
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('to')))
  })
})
