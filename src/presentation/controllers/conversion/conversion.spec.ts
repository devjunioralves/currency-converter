import { type IConvertedCurrencyModel } from '@/domain/models/IConvertedCurrency'
import { type IConvertCurrency, type IConvertCurrencyModel } from '@/domain/usecases/ConvertCurrency'
import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { MissingParamError } from '@/presentation/errors/MissingParamError'
import { badRequest } from '@/presentation/helpers/HttpHelper'
import { ConversionController } from './Conversion'

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

const makeConvertCurrency = (): IConvertCurrency => {
  class ConvertCurrencyStub implements IConvertCurrency {
    async convert (data: IConvertCurrencyModel): Promise<IConvertedCurrencyModel> {
      return await new Promise(resolve => { resolve(makeFakeConvertedCurrency()); })
    }
  }
  return new ConvertCurrencyStub()
}

interface SutTypes {
  sut: ConversionController
  convertCurrencyStub: IConvertCurrency
}

const makeSut = (): SutTypes => {
  const convertCurrencyStub = makeConvertCurrency()
  const sut = new ConversionController(convertCurrencyStub)
  return {
    sut,
    convertCurrencyStub
  }
}

describe('Conversion Controller', () => {
  it('Should return 400 if no currency origin is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        value: 1,
        to: 'BRL'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('from')))
  })

  it('Should return 400 if no currency destination is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        value: 1,
        from:'USD'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('to')))
  })

  it('Should return 400 if no value is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        from:'USD',
        to:'BRL'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('value')))
  })

  it('Should return 400 if invalid currency origin is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        from:'BTC',
        to:'BRL',
        value: 1
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('from')))
  })

  it('Should return 400 if invalid currency destination is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      body: {
        from:'USD',
        to:'BTC',
        value: 1
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('to')))
  })

  it('Should call convertCurrency with correct values', async () => {
    const { sut, convertCurrencyStub} = makeSut()
    const convertSpy = jest.spyOn(convertCurrencyStub, 'convert')
    await sut.handle({
      body: {
        to: 'BRL',
        from: 'USD',
        value: 1
      }
    })
    expect(convertSpy).toHaveBeenCalledWith({
      to: 'BRL',
      from: 'USD',
      amount: 1
    })
  })
})
