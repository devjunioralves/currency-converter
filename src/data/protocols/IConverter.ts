import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency";
import { type IConvertCurrencyModel } from "@/domain/usecases/ConvertCurrency";

export interface IConverter {
  convert: (data: IConvertCurrencyModel) => Promise<IConvertedCurrencyModel>
}