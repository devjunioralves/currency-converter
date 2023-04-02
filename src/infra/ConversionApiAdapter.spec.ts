import { ConversionApiAdapter } from "./ConversionApiAdapter"

const makeSut = (): ConversionApiAdapter => {
  return new ConversionApiAdapter()
}

global.fetch = jest.fn(async () =>
  await Promise.resolve({
    json: async () => await Promise.resolve({}),
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
})
