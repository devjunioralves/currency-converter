import { ConversionController } from "@/presentation/controllers/conversion/Conversion";
import { type IController } from "@/presentation/protocols/IController";
import { ConvertCurrency } from "@/data/usecases/ConvertCurrency";
import { ConversionApiAdapter } from "@/infra/ConversionApi/ConversionApiAdapter";
import { ConversionRepository } from "@/infra/Db/SQLite/ConversionRepository/ConversionRepository";
import { LogRepository } from "@/infra/Db/SQLite/LogRepository/LogRepository";
import { LogControllerDecorator } from "../decorators/LogControllerDecorator";

export const makeConversionController = (): IController => {
  const converter = new ConversionApiAdapter()
  const addConversionRepository = new ConversionRepository()
  const convertCurrency = new ConvertCurrency(converter, addConversionRepository)
  const conversionController = new ConversionController(convertCurrency);
  const logRepository = new LogRepository()
  return new LogControllerDecorator(conversionController, logRepository)
}