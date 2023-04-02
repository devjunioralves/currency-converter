import { insertErrorLog } from "../helpers/SQLiteHelper"
import { type ILogRepository } from "@/data/protocols/ILogRepository"

export class LogRepository implements ILogRepository {
  async errorLog (stack: string): Promise<void> {
    await insertErrorLog(stack)
  }
}