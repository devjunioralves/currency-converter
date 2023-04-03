import { type ITransaction } from '@/domain/models/ITransaction'
import { type IListConversion } from '@/domain/usecases/ListConversion'
import { ok, serverError } from '@/presentation/helpers/HttpHelper'
import { ListConversionController } from './ListConversion'

const makeFakeTransactions = (): ITransaction[] => ([{
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
}])

const makeListConversion = (): IListConversion => {
  class ListConversionStub implements IListConversion {
    async list(): Promise<ITransaction[]> {
      return await new Promise(resolve => {
        resolve(makeFakeTransactions())
      })
    }
  }
  return new ListConversionStub()
}

interface SutTypes {
  sut: ListConversionController
  listConversionStub: IListConversion
}

const makeSut = (): SutTypes => {
  const listConversionStub = makeListConversion()
  const sut = new ListConversionController(listConversionStub)
  return {
    sut,
    listConversionStub,
  }
}

describe('ListConversion Controller', () => {
  it('Should return 500 if ListConversion use case throws', async () => {
    const { sut, listConversionStub } = makeSut()

    jest.spyOn(listConversionStub, 'list').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()); }),
    )

    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  it('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(makeFakeTransactions()))
  })
})
