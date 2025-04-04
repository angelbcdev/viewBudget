import { BackendService } from "../services/backendService";
import { StorageService } from "../services/storageService";

export type CardDetails = "Total Needs" | "Total Wants" | "Total Savings" | " ";
export type TransactionBudget = "Needs" | "Wants" | "Savings";
export type TransactionType = "Income" | "Expense" | "Savings";
export const TransactionBudgets: TransactionBudget[] = [
  "Wants",
  "Needs",
  "Savings",
];

export const fakeID = () => {
  return Math.random().toString(36).substring(2, 15);
};

export interface Transaction {
  id: string;
  amount: number;
  name: string;
  description: string;
  type: TransactionBudget;
  category: TransactionType;
}
export const initialNeeds: Transaction[] = [
  {
    id: "ff5c184s56h",
    amount: 1300,
    name: "Rent",
    description: "Rent for the month",
    type: "Needs",
    category: "Expense",
  },
  {
    id: "ff5c184s5dh",
    amount: 130,
    name: "Car Insurance",
    description: "Car Insurance for the month",
    type: "Needs",
    category: "Expense",
  },
  {
    id: "ff5cs84s56h",
    amount: 130,
    name: "Car Insurance",
    description: "Car Insurance for the month",
    type: "Needs",
    category: "Expense",
  },
  {
    id: "ff5csd84s56h",
    amount: 160,
    name: "Cell Phone",
    description: "Cell Phone for the month",
    type: "Needs",
    category: "Income",
  },
];
export const initialWants: Transaction[] = [
  {
    id: "ff5cdd184s56h",
    amount: 80,
    name: "Gasoline",
    description: "2 times a week",
    type: "Wants",
    category: "Expense",
  },
];
export class DataManager {
  static instance: DataManager;
  totalBalance = 0;
  needs = this.totalBalance * 0.6;
  currentsNeeds = 0;
  allNeeds: Transaction[];
  wants = this.totalBalance * 0.3;
  currentsWants = 0;
  allWants: Transaction[];
  savings = this.totalBalance * 0.1;
  currentsSavings = 0;
  allSavings: Transaction[] = [
    {
      id: "ffwcdd184s56h",
      amount: 300,
      name: "Savings",
      description: "Savings for the month",
      type: "Savings",
      category: "Savings",
    },
  ];
  showAllResults: any[] = [];
  isUpdated = false;

  private constructor() {
    this.totalBalance = 0;
    this.allNeeds = [];
    this.allWants = [];
  }

  updateResults({
    needs,
    wants,
    balance,
  }: {
    needs: Transaction[];
    wants: Transaction[];
    balance: number;
  }) {
    DataManager.instance.totalBalance = balance || 0;
    DataManager.instance.allNeeds = needs || [];
    DataManager.instance.allWants = wants || [];
    this.calculateBudget();
    this.showAllResults = [this.getNeeds(), this.getWants(), this.getSavings()];
    DataManager.instance.isUpdated = true;
  }

  calculateBudget() {
    this.needs = this.totalBalance * 0.6;
    this.wants = this.totalBalance * 0.3;
    this.savings = this.totalBalance * 0.1;
  }

  public static getInstance() {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    } else {
      // Update existing instance with new data
    }
    return DataManager.instance;
  }
  getNeeds() {
    const { balance, totalConsumed, currentBalance } = this.calculateBalance(
      this.allNeeds,
      this.needs
    );
    return {
      title: "Total Needs",
      balance: balance,
      currentBalance: currentBalance,
      transactions: this.allNeeds,
      totalConsumed,
      type: "Needs",
    };
  }
  getWants() {
    const { balance, totalConsumed, currentBalance } = this.calculateBalance(
      this.allWants,
      this.wants
    );
    return {
      title: "Total Wants",
      balance: balance,
      currentBalance: currentBalance,
      transactions: this.allWants,
      totalConsumed,
      type: "Wants",
    };
  }
  getSavings() {
    const { balance, totalConsumed, currentBalance } = this.calculateBalance(
      this.allSavings,
      this.savings
    );
    return {
      title: "Total Savings",
      balance: balance,
      currentBalance: Math.abs(currentBalance),

      transactions: this.allSavings,
      totalConsumed,
      type: "Savings",
    };
  }

  calculateBalance(data: Transaction[], initialBalance: number) {
    const total = data.reduce(
      (acc, curr) => {
        if (curr.category == "Income") {
          acc.balance += curr.amount;
        }
        if (curr.category == "Expense") {
          acc.totalConsumed += curr.amount;
        }
        if (curr.category == "Savings") {
          acc.totalConsumed += curr.amount;
        }

        return acc;
      },
      {
        totalConsumed: 0,

        balance: Number(initialBalance.toFixed(2)),
      }
    );
    return {
      totalConsumed: total.totalConsumed,
      balance: total.balance,
      currentBalance: total.balance - total.totalConsumed,
    };
  }

  getResults() {
    return this.showAllResults;
  }
  addTransaction({
    transaction,
    amount,
    name,
    description = "",
    category,
    id,
  }: {
    transaction: TransactionBudget;
    amount: number;
    name: string;
    description: string;
    category: TransactionType;
    id: string;
  }) {
    const newTransaction: Transaction = {
      amount: Number(amount),
      name,
      description,
      type: transaction,
      category: category,
      id,
    };
    switch (transaction) {
      case "Needs":
        this.allNeeds.push(newTransaction);
        break;
      case "Wants":
        this.allWants.push(newTransaction);
        break;
      case "Savings":
        this.allSavings.push(newTransaction);
        break;
    }
    this.saveData();
  }
  clearAllTransactions() {
    this.allNeeds = initialNeeds;
    this.allWants = [];
    this.allSavings = [];
  }
  changeBalance(balance: number) {
    this.totalBalance = balance;
    this.needs = this.totalBalance * 0.6;
    this.wants = this.totalBalance * 0.3;
    this.savings = this.totalBalance * 0.1;
    StorageService.getInstance().setBalance(balance);
  }
  deleteTransaction(id: string) {
    this.allNeeds = this.allNeeds.filter((t) => t.id !== id);

    this.allWants = this.allWants.filter((t) => t.id !== id);

    this.saveData();
  }
  saveData() {
    // StorageService.getInstance().setNeeds(this.allNeeds);
    // StorageService.getInstance().setWants(this.allWants);
    // StorageService.getInstance().setBalance(this.totalBalance);

    BackendService.getInstance().saveData({
      needs: this.allNeeds,
      wants: this.allWants,
      balance: this.totalBalance,
    });
    this.isUpdated = false;
  }
  setNeeds(needs: Transaction[]) {
    this.allNeeds = needs;
  }
  setWants(wants: Transaction[]) {
    this.allWants = wants;
  }
  setBalance(balance: number) {
    this.totalBalance = balance;
    this.calculateBudget();
  }
}
