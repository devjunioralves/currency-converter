import { ConversionRepository } from "./ConversionRepository"

const makeSut = (): ConversionRepository => {
  return new ConversionRepository()
}

describe('ConversionRepository', () => {
  it('Should return an transaction on success', async () => {
    const sut = makeSut()
    const result = await sut.add({
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
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('id')
    expect(result).toHaveProperty('date')
    expect(result).toHaveProperty('historical')
    expect(result).toHaveProperty('info')
    expect(result).toHaveProperty('query')
    expect(result).toHaveProperty('result')
    expect(result).toHaveProperty('success')
  })
})
