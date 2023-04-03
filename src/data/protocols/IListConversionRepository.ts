import { type ITransaction } from "@/domain/models/ITransaction";

export interface IListConversionRepository {
  list: () => Promise<ITransaction[]>
}