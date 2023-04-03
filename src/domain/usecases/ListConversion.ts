import { type ITransaction } from "../models/ITransaction";

export interface IListConversion {
  list: () => Promise<ITransaction[]>
}