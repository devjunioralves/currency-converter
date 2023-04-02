import { type IConvertedCurrencyModel } from '@/domain/models/IConvertedCurrency'
import { type ITransaction } from '@/domain/models/ITransaction'
import { type IConvertCurrencyModel } from '@/domain/usecases/ConvertCurrency'
import { type IAddConversionRepository } from '../protocols/AddConversionRepository'
import { ConvertCurrency } from './ConvertCurrency'

interface IConverter {
  convert: (data: IConvertCurrencyModel) => Promise<IConvertedCurrencyModel>
}

interface SutTypes {
  sut: ConvertCurrency
  converterStub: IConverter
  addConversionRepositoryStub: IAddConversionRepository
}

const makeFakeConvertedCurrency = (): IConvertedCurrencyModel => ({
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

const makeAddConversionRepository = (): IAddConversionRepository => {
  class AddConversionRepositoryStub implements IAddConversionRepository {
    async add(data: IConvertedCurrencyModel): Promise<ITransaction> {
      return await new Promise((resolve) => {
        resolve({
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
    }
  }
  return new AddConversionRepositoryStub()
}

const makeConverter = (): IConverter => {
  class ConverterStub implements IConverter {
    async convert(
      data: IConvertCurrencyModel
    ): Promise<IConvertedCurrencyModel> {
      return await new Promise((resolve) => {
        resolve(makeFakeConvertedCurrency())
      })
    }
  }
  return new ConverterStub()
}

const makeSut = (): SutTypes => {
  const converterStub = makeConverter()
  const addConversionRepositoryStub = makeAddConversionRepository()
  const sut = new ConvertCurrency(converterStub, addConversionRepositoryStub)
  return {
    sut,
    converterStub,
    addConversionRepositoryStub
  }
}

describe('ConvertCurrency UseCase', () => {
  it('Should call converter with correct values', async () => {
    const { sut, converterStub } = makeSut()
    const convertSpy = jest.spyOn(converterStub, 'convert')
    await sut.convert({
      from: 'USD',
      to: 'BRL',
      amount: 1,
    })
    expect(convertSpy).toHaveBeenCalledWith({
      from: 'USD',
      to: 'BRL',
      amount: 1,
    })
  })

  it('Should throw error if converter throws', async () => {
    const { sut, converterStub } = makeSut()
    jest.spyOn(converterStub, 'convert').mockReturnValueOnce(
      new Promise((resolve, reject) => {
        reject(new Error())
      })
    )
    const promise = sut.convert({
      from: 'USD',
      to: 'BRL',
      amount: 1,
    })
    await expect(promise).rejects.toThrow()
  })

  it('Should call AddConversionRepository with correct values', async () => {
    const { sut, addConversionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addConversionRepositoryStub, 'add')
    await sut.convert({
      from: 'USD',
      to: 'BRL',
      amount: 1,
    })
    expect(addSpy).toHaveBeenCalledWith(makeFakeConvertedCurrency())
  })
})
