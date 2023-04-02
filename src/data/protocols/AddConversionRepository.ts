import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency";
import { type ITransaction } from "@/domain/models/ITransaction";

export interface IAddConversionRepository {
  add: (data: IConvertedCurrencyModel) => Promise<ITransaction>
}