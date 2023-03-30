interface HttpResponse {
  statusCode: number
  body: any
}

interface HttpRequest {
  body?: any
}

interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}

describe('Conversion Controller', () => {
  it('Should return 400 if no coin is provided', async () => {
    class ConversionControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 400,
          body: new Error('Missing param: coin')
        }
        return await new Promise(resolve => { resolve(httpResponse); })
      }
    }
    const conversionControllerStub = new ConversionControllerStub()
    const httpResponse = await conversionControllerStub.handle({
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
