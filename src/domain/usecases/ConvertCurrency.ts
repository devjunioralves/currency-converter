import { type IConvertedCurrencyModel } from "../models/IConvertedCurrency"

export interface IConvertCurrencyModel {
  to: string
  from: string
  amount: number
}

export interface IConvertCurrency {
  convert: (data: IConvertCurrencyModel) => Promise<IConvertedCurrencyModel>
}