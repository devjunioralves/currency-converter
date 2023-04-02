import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency"
import { type IConvertCurrencyModel, type IConvertCurrency } from "@/domain/usecases/ConvertCurrency"
import { type IAddConversionRepository } from "../protocols/AddConversionRepository"

export class ConvertCurrency implements IConvertCurrency {
  constructor (
    private readonly convertCurrency: IConvertCurrency,
    private readonly addConversionRepository: IAddConversionRepository
  ) {
    this.convertCurrency = convertCurrency
  }

  async convert (data: IConvertCurrencyModel): Promise<IConvertedCurrencyModel> {
    const convertedCurrency = await this.convertCurrency.convert(data)
    await this.addConversionRepository.add(convertedCurrency)
    return convertedCurrency
  }
}