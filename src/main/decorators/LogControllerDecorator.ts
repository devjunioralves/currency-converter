import { type ILogRepository } from "@/data/protocols/ILogRepository";
import { type IController } from "@/presentation/protocols/IController";

export class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly logRepository: ILogRepository
  ){
    this.controller = controller;
    this.logRepository = logRepository;
  }

  async handle(request: any): Promise<any> {
    const httpResponse = await this.controller.handle(request);
    if (httpResponse.statusCode === 500) {
      await this.logRepository.errorLog(httpResponse.body.stack);
    }
    return httpResponse;
  }
}