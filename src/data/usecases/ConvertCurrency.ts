import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency"
import { type IConvertCurrencyModel, type IConvertCurrency } from "@/domain/usecases/ConvertCurrency"

export class ConvertCurrency implements IConvertCurrency {
  constructor (
    private readonly convertCurrency: IConvertCurrency
  ) {
    this.convertCurrency = convertCurrency
  }

  async convert (data: IConvertCurrencyModel): Promise<IConvertedCurrencyModel> {
    return await this.convertCurrency.convert(data)
  }
}