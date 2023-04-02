import { type IConverter } from '@/data/protocols/IConverter'
import { type IConvertedCurrencyModel } from '@/domain/models/IConvertedCurrency'
import { type IConvertCurrencyModel } from '@/domain/usecases/ConvertCurrency'

export class ConversionApiAdapter implements IConverter {
  async convert(data: IConvertCurrencyModel): Promise<IConvertedCurrencyModel> {
    const { amount, from, to } = data

    const myHeaders = new Headers()
    myHeaders.append('apikey', 'keDCQ0OHX5eYhPU0rZLXMHmSJz3DKOGe')

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    }

    const response = await fetch(
      `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
      requestOptions as RequestInit
    )
    const result = await response.json()
    return result
  }
}
