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
})
