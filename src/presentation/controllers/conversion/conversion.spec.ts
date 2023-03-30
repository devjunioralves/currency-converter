import { ConversionController } from './Conversion'

describe('Conversion Controller', () => {
  it('Should return 400 if no coin is provided', async () => {
    const conversionController = new ConversionController()
    const httpResponse = await conversionController.handle({
      body: {
        coin: '',
        value: 1
      }
    })
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error('Missing param: coin')
    })
  })
})
