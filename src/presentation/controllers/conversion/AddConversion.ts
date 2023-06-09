import { type IConvertCurrency } from '@/domain/usecases/ConvertCurrency'
import { InvalidParamError } from '@/presentation/errors/InvalidParamError'
import { MissingParamError } from '@/presentation/errors/MissingParamError'
import { badRequest, ok, serverError } from '@/presentation/helpers/HttpHelper'
import { type IController } from '@/presentation/protocols/IController'
import {
  type IHttpRequest,
  type IHttpResponse,
} from '@/presentation/protocols/IHttp'

export class AddConversionController implements IController {
  constructor(private readonly convertCurrency: IConvertCurrency) {
    this.convertCurrency = convertCurrency
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const requiredFields = ['from', 'to', 'value']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const validCurrencies = ['USD', 'BRL', 'EUR', 'JPY']

      if (!validCurrencies.includes(httpRequest.body.from)) {
        return badRequest(new InvalidParamError('from'))
      }

      if (!validCurrencies.includes(httpRequest.body.to)) {
        return badRequest(new InvalidParamError('to'))
      }

      const convertedCurrency = await this.convertCurrency.convert({
        from: httpRequest.body.from,
        to: httpRequest.body.to,
        amount: httpRequest.body.value,
      })

      return ok(convertedCurrency)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
