import { ConversionController } from "@/presentation/controllers/conversion/Conversion";
import { type IController } from "@/presentation/protocols/IController";
import { ConvertCurrency } from "@/data/usecases/ConvertCurrency";
import { ConversionApiAdapter } from "@/infra/ConversionApi/ConversionApiAdapter";
import { ConversionRepository } from "@/infra/Db/SQLite/ConversionRepository/ConversionRepository";

export const makeConversionController = (): IController => {
  const converter = new ConversionApiAdapter()
  const addConversionRepository = new ConversionRepository()
  const convertCurrency = new ConvertCurrency(converter, addConversionRepository)
  return new ConversionController(convertCurrency);
}