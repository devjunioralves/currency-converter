import { type IHttpResponse, type IHttpRequest } from './IHttp'

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
