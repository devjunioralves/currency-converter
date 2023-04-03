import { type ITransaction } from "@/domain/models/ITransaction"
import { type IConvertCurrencyModel, type IConvertCurrency } from "@/domain/usecases/ConvertCurrency"
import { type IAddConversionRepository } from "@/data/protocols/IAddConversionRepository"
import { type IConverter } from "@/data/protocols/IConverter"

export class ConvertCurrency implements IConvertCurrency {
  constructor (
    private readonly converter: IConverter,
    private readonly addConversionRepository: IAddConversionRepository
  ) {
    this.converter = converter
    this.addConversionRepository = addConversionRepository
  }

  async convert (data: IConvertCurrencyModel): Promise<ITransaction> {
    const convertedCurrency = await this.converter.convert(data)
    const transaction = await this.addConversionRepository.add(convertedCurrency)
    return transaction
  }
}