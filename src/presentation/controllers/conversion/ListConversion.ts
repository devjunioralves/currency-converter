import { type IListConversion } from "@/domain/usecases/ListConversion";
import { ok, serverError } from "@/presentation/helpers/HttpHelper";
import { type IController } from "@/presentation/protocols/IController";
// import { type IHttpResponse } from "@/presentation/protocols/IHttp";

export class ListConversionController implements IController {
  constructor(private readonly listConversion: IListConversion) {
    this.listConversion = listConversion;
  }

  async handle(): Promise<any> {
    try {
      const conversions = await this.listConversion.list();
      return ok(conversions);
    } catch (error) {
      return serverError(error as Error)
    }
  }
}