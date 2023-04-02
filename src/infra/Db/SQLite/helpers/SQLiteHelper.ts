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

export async function createTable(): Promise<void> {
  void openDb().then(db => {
    db.exec('CREATE TABLE IF NOT EXISTS `Transaction` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, `date` TEXT NOT NULL, `historical` TEXT NOT NULL, `info` TEXT NOT NULL, `query` TEXT NOT NULL, `result` TEXT NOT NULL, `success` BOOLEAN NOT NULL);')
  })
}

export async function insertTransaction(transaction: IConvertedCurrencyModel): Promise<ITransaction> {
  await createTable();
  const db = await openDb();
  await db.exec(`INSERT INTO 'Transaction' (date, historical, info, query, result, success) VALUES ('${transaction.date}', '${transaction.historical}', '${JSON.stringify(transaction.info)}', '${JSON.stringify(transaction.query)}', '${transaction.result}', '${transaction.success}');`)

  const transactionInserted = await db.get('SELECT * FROM `Transaction` ORDER BY id DESC LIMIT 1;')
  return map(transactionInserted) ;
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