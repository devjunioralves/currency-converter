import { type IListConversionRepository } from "@/data/protocols/IListConversionRepository";
import { type ITransaction } from "@/domain/models/ITransaction";
import { ListConversion } from "./ListConversion";

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

interface SutTypes {
  sut: ListConversion
  listConversionRepositoryStub: IListConversionRepository
}

const makeListConversionRepository = (): IListConversionRepository => {
  class ListConversionRepositoryStub implements IListConversionRepository {
    async list(): Promise<ITransaction[]> {
      return await new Promise((resolve) => { resolve(makeFakeTransactions()); })
    }
  }
  return new ListConversionRepositoryStub()
}

const makeSut = (): SutTypes => {
  const listConversionRepositoryStub = makeListConversionRepository()
  const sut = new ListConversion(listConversionRepositoryStub)
  return {
    sut,
    listConversionRepositoryStub,
  }
}

describe('ListConversion use case', () => {
  it('Should call ListConversionRepository', async () => {
    const { sut, listConversionRepositoryStub } = makeSut()
    const listSpy = jest.spyOn(listConversionRepositoryStub, 'list')
    await sut.list()
    expect(listSpy).toHaveBeenCalled()
  })
})
