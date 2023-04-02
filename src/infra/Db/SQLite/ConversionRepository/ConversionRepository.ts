import { type IAddConversionRepository } from "@/data/protocols/AddConversionRepository";
import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency";
import { type ITransaction } from "@/domain/models/ITransaction";
import { insertTransaction } from "@/infra/Db/SQLite/helpers/SQLiteHelper";

export class ConversionRepository implements IAddConversionRepository {
  async add(data: IConvertedCurrencyModel): Promise<ITransaction> {
    const transaction = await insertTransaction(data);
    return transaction;
  }
}