export interface ILogRepository {
  errorLog: (stack: string) => Promise<void>
}
