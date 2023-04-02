import { type ITransaction } from "@/domain/models/ITransaction"
import { type IConvertCurrencyModel, type IConvertCurrency } from "@/domain/usecases/ConvertCurrency"
import { type IAddConversionRepository } from "../protocols/AddConversionRepository"

export class ConvertCurrency implements IConvertCurrency {
  constructor (
    private readonly convertCurrency: IConvertCurrency,
    private readonly addConversionRepository: IAddConversionRepository
  ) {
    this.convertCurrency = convertCurrency
  }

  async convert (data: IConvertCurrencyModel): Promise<ITransaction> {
    const convertedCurrency = await this.convertCurrency.convert(data)
    const transaction = await this.addConversionRepository.add(convertedCurrency)
    return transaction
  }
}