import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency"
import { type IConvertCurrencyModel } from "@/domain/usecases/ConvertCurrency"
import { ConvertCurrency } from "./ConvertCurrency"

interface IConverter {
  convert: (data: IConvertCurrencyModel) => Promise<IConvertedCurrencyModel>
}

interface SutTypes {
  sut: ConvertCurrency
  converterStub: IConverter
}

const makeFakeConvertedCurrency = (): IConvertedCurrencyModel => ({
  date: '2018-02-22',
  historical: "",
  info: {
    rate: 148.972231,
    timestamp: 1519328414
  },
  query: {
    amount: 25,
    from: "GBP",
    to: "JPY"
  },
  result: 3724.305775,
  success: true
})

const makeConverter = (): IConverter => {
  class ConverterStub implements IConverter {
    async convert (data: IConvertCurrencyModel): Promise<IConvertedCurrencyModel> {
      return await new Promise(resolve => { resolve(makeFakeConvertedCurrency()); })
    }
  }
  return new ConverterStub()
}

const makeSut = (): SutTypes => {
  const converterStub = makeConverter()
  const sut = new ConvertCurrency(converterStub)
  return {
    sut,
    converterStub
  }
}

describe('ConvertCurrency UseCase', () => {
  it('Should call converter with correct values', async () => {
    const { sut, converterStub } = makeSut()
    const convertSpy = jest.spyOn(converterStub, 'convert')
    await sut.convert({
      from: 'USD',
      to: 'BRL',
      amount: 1
    })
    expect(convertSpy).toHaveBeenCalledWith({
      from: 'USD',
      to: 'BRL',
      amount: 1
    })
  })
})
