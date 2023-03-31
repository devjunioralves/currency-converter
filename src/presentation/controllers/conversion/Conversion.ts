import { InvalidParamError } from "@/presentation/errors/InvalidParamError";
import { MissingParamError } from "@/presentation/errors/MissingParamError";
import { badRequest } from "@/presentation/helpers/HttpHelper";
import {  type IController } from "@/presentation/protocols/IController";
import { type IHttpRequest, type IHttpResponse } from "@/presentation/protocols/IHttp";

export class ConversionController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
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

    return await new Promise(resolve => { resolve({
      statusCode: 400,
      body: new Error('Missing param: coin')
    }); })
  }
}