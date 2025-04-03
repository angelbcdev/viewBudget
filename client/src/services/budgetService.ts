import { db } from "../config/db";
import { Transaction, Category } from "../types/budget.types";

export const budgetService = {
  async getTransactions(): Promise<Transaction[]> {
    return await db.transactions.toArray();
  },

  async addTransaction(
    transaction: Omit<Transaction, "id">
  ): Promise<Transaction> {
    const id = await db.transactions.add(transaction);
    return { ...transaction, id };
  },

  async getCategories(): Promise<Category[]> {
    return await db.categories.toArray();
  },

  async updateCategory(id: number, current: number): Promise<void> {
    await db.categories.update(id, { current });
  },

  async getCategoryTotals() {
    const [categories, transactions] = await Promise.all([
      this.getCategories(),
      this.getTransactions(),
    ]);

    return {
      needs: {
        total: categories
          .filter((c) => c.type === "needs")
          .reduce((sum, c) => sum + c.budget, 0),
        current: transactions
          .filter((t) => t.type === "needs")
          .reduce((sum, t) => sum + t.amount, 0),
      },
      wants: {
        total: categories
          .filter((c) => c.type === "wants")
          .reduce((sum, c) => sum + c.budget, 0),
        current: transactions
          .filter((t) => t.type === "wants")
          .reduce((sum, t) => sum + t.amount, 0),
      },
      savings: {
        total: categories
          .filter((c) => c.type === "savings")
          .reduce((sum, c) => sum + c.budget, 0),
        current: transactions
          .filter((t) => t.type === "savings")
          .reduce((sum, t) => sum + t.amount, 0),
      },
    };
  },

  // Método para inicializar datos de ejemplo
  async initializeData() {
    if ((await db.categories.count()) === 0) {
      await db.categories.bulkAdd([
        { name: "Rent", type: "needs", budget: 1000, current: 1000 },
        { name: "Food", type: "needs", budget: 500, current: 400 },
        { name: "Entertainment", type: "wants", budget: 300, current: 250 },
        { name: "Savings", type: "savings", budget: 200, current: 200 },
      ]);
    }
  },
};
