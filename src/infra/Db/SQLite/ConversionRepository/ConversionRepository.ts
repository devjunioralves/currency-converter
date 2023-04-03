import { type IAddConversionRepository } from "@/data/protocols/IAddConversionRepository";
import { type IListConversionRepository } from "@/data/protocols/IListConversionRepository";
import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency";
import { type ITransaction } from "@/domain/models/ITransaction";
import { insertTransaction, listTransactions } from "@/infra/db/sqlite/helpers/SQLiteHelper";

export class ConversionRepository implements IAddConversionRepository, IListConversionRepository {
  async add(data: IConvertedCurrencyModel): Promise<ITransaction> {
    const transaction = await insertTransaction(data);
    return transaction;
  }

  async list(): Promise<ITransaction[]> {
    const transactions = await listTransactions()
    return transactions
  }
}