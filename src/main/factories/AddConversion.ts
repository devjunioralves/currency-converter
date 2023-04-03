import { AddConversionController } from "@/presentation/controllers/conversion/AddConversion";
import { type IController } from "@/presentation/protocols/IController";
import { ConvertCurrency } from "@/data/usecases/addConversion/ConvertCurrency";
import { ConversionApiAdapter } from "@/infra/conversionApi/ConversionApiAdapter";
import { ConversionRepository } from "@/infra/db/sqlite/conversionRepository/ConversionRepository";
import { LogRepository } from "@/infra/db/sqlite/logRepository/LogRepository";
import { LogControllerDecorator } from "../decorators/LogControllerDecorator";

export const makeAddConversionController = (): IController => {
  const converter = new ConversionApiAdapter()
  const addConversionRepository = new ConversionRepository()
  const convertCurrency = new ConvertCurrency(converter, addConversionRepository)
  const conversionController = new AddConversionController(convertCurrency);
  const logRepository = new LogRepository()
  return new LogControllerDecorator(conversionController, logRepository)
}