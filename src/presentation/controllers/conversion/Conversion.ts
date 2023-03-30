import {  type IController } from "@/presentation/protocols/IController";
import { type IHttpRequest, type IHttpResponse } from "@/presentation/protocols/IHttp";

export class ConversionController implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse: IHttpResponse = {
      statusCode: 400,
      body: new Error('Missing param: coin')
    }
    return await new Promise(resolve => { resolve(httpResponse); })
  }
}