import { type IListConversionRepository } from "@/data/protocols/IListConversionRepository";
import { type ITransaction } from "@/domain/models/ITransaction";
import { type IListConversion } from "@/domain/usecases/ListConversion";

export class ListConversion implements IListConversion {
  constructor(
    private readonly listConversionRepository: IListConversionRepository
  ) {}

  async list(): Promise<ITransaction[]> {
    return await this.listConversionRepository.list()
  }
}