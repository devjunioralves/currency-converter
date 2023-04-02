import { ConversionApiAdapter } from "./ConversionApiAdapter"

const makeSut = (): ConversionApiAdapter => {
  return new ConversionApiAdapter()
}

global.fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => await Promise.resolve({
      id: 'any_id',
      date: '2018-02-22',
      historical: '',
      info: {
        rate: 148.972231,
        timestamp: 1519328414,
      },
      query: {
        amount: 25,
        from: 'GBP',
        to: 'JPY',
      },
      result: 3724.305775,
      success: true,
    }),
  }),
) as jest.Mock;

describe('ConversionApiAdapter', () => {
  it('Should call ConversionApi', async () => {
    const sut = makeSut()
    await sut.convert({
      from: 'USD',
      to: 'BRL',
      amount: 1,
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('Should return a conversion on success', async () => {
    const sut = makeSut()
    const result = await sut.convert({
      from: 'USD',
      to: 'BRL',
      amount: 1,
    })
    expect(result).toEqual({
      id: 'any_id',
      date: '2018-02-22',
      historical: '',
      info: {
        rate: 148.972231,
        timestamp: 1519328414,
      },
      query: {
        amount: 25,
        from: 'GBP',
        to: 'JPY',
      },
      result: 3724.305775,
      success: true,
    })
  })
})
