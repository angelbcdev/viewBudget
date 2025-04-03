import Dexie, { Table } from "dexie";
import { Transaction, Category } from "../types/budget.types";

export class FinanceDatabase extends Dexie {
  transactions!: Table<Transaction>;
  categories!: Table<Category>;

  constructor() {
    super("financeDB");
    this.version(1).stores({
      transactions: "++id, amount, type, category, date",
      categories: "++id, name, type, budget, current",
    });
  }
}

export const db = new FinanceDatabase();
