import { ListConversion } from "@/data/usecases/listConversion/ListConversion";
import { ConversionRepository } from "@/infra/db/sqlite/conversionRepository/ConversionRepository";
import { LogRepository } from "@/infra/db/sqlite/logRepository/LogRepository";
import { ListConversionController } from "@/presentation/controllers/conversion/ListConversion";
import { type IController } from "@/presentation/protocols/IController";
import { LogControllerDecorator } from "../decorators/LogControllerDecorator";

export const makeListConversionController = (): IController => {
  const listConversionRepository = new ConversionRepository();
  const listConversion = new ListConversion(listConversionRepository);
  const listConversionController = new ListConversionController(listConversion);
  const logRepository = new LogRepository();
  return new LogControllerDecorator(listConversionController, logRepository);
}