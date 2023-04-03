/* eslint-disable @typescript-eslint/restrict-template-expressions */
import sqlite3  from "sqlite3";
import { open } from "sqlite";
import { type IConvertedCurrencyModel } from "@/domain/models/IConvertedCurrency";
import { type ITransaction } from "@/domain/models/ITransaction";

export async function openDb(): Promise<any> {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database
  });
  return db;
}

export async function createTableTransaction(): Promise<void> {
  void openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS `Transaction` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `date` TEXT NOT NULL, `historical` TEXT NOT NULL, `info` TEXT NOT NULL, `query` TEXT NOT NULL, `result` TEXT NOT NULL, `success` BOOLEAN NOT NULL);')
  })
}

export async function insertTransaction(transaction: IConvertedCurrencyModel): Promise<ITransaction> {
  await createTableTransaction();
  const db = await openDb();
  await db.exec(`INSERT INTO 'Transaction' (date, historical, info, query, result, success) VALUES ('${transaction.date}', '${transaction.historical}', '${JSON.stringify(transaction.info)}', '${JSON.stringify(transaction.query)}', '${transaction.result}', '${transaction.success}');`)

  const transactionInserted = await db.get('SELECT * FROM `Transaction` ORDER BY id DESC LIMIT 1;')
  return map(transactionInserted) ;
}

export async function createTableErrorLog(): Promise<void> {
  void openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS `ErrorLog` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `stack` TEXT NOT NULL, `date` TEXT);')
  })
}

export async function insertErrorLog(error: string): Promise<void> {
  await createTableErrorLog()
  const db = await openDb();
  await db.exec(`INSERT INTO 'ErrorLog' (stack, date) VALUES ('${error}', datetime('now', 'localtime'));`)
}

export async function listTransactions(): Promise<ITransaction[]> {
  await createTableTransaction();
  const db = await openDb();
  const transactions = await db.all('SELECT * FROM `Transaction`;')
  return transactions.map((transaction: any) => map(transaction));
}

export function map(data: any): ITransaction {
  return {
    id: data.id,
    date: data.date,
    historical: data.historical,
    info: JSON.parse(data.info),
    query: JSON.parse(data.query),
    result: Number(data.result),
    success: data.success === 'true',
  }
}