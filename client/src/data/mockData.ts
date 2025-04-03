import { StorageService } from "../services/storageService";

export type CardDetails = "Total Needs" | "Total Wants" | "Total Savings" | " ";
export type TransactionType = "Needs" | "Wants" | "Savings";
export const TransactionTypes: TransactionType[] = [
  "Wants",
  "Needs",
  "Savings",
];
export interface Transaction {
  amount: number;
  name: string;
  description: string;
  type: TransactionType;
}
export const initialNeeds: Transaction[] = [
  {
    amount: 1300,
    name: "Rent",
    description: "Rent for the month",
    type: "Needs",
  },
  {
    amount: 130,
    name: "Car Insurance",
    description: "Car Insurance for the month",
    type: "Needs",
  },
  {
    amount: 130,
    name: "Cell Phone",
    description: "Cell Phone for the month",
    type: "Needs",
  },
];
export const initialWants: Transaction[] = [
  {
    amount: 80,
    name: "Gasoline",
    description: "2 times a week",
    type: "Wants",
  },
];
export class DataManager {
  private static instance: DataManager;
  totalBalance = 0;
  needs = this.totalBalance * 0.6;
  currentsNeeds = 0;
  allNeeds: Transaction[] = [];
  wants = this.totalBalance * 0.3;
  currentsWants = 0;
  allWants: Transaction[] = [];
  savings = this.totalBalance * 0.1;
  currentsSavings = 0;
  allSavings = [
    {
      amount: 300,
      name: "Savings",
      description: "Savings for the month",
      type: "Savings",
    },
  ];

  private constructor() {
    const balanceFromStorage = StorageService.getInstance().getBalance();

    this.totalBalance = balanceFromStorage || 2700;
    this.needs = this.totalBalance * 0.6;
    this.wants = this.totalBalance * 0.3;
    this.savings = this.totalBalance * 0.1;
    this.allNeeds =
      StorageService.getInstance().getNeeds()?.length > 0
        ? StorageService.getInstance().getNeeds()
        : initialNeeds;
    this.allWants =
      StorageService.getInstance().getWants()?.length > 0
        ? StorageService.getInstance().getWants()
        : initialWants;
  }
  public static getInstance() {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }
  getNeeds() {
    const totalConsumed = this.allNeeds.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return {
      title: "Total Needs",
      balance: this.needs.toFixed(2),
      currentBalance: this.needs - totalConsumed,
      transactions: this.allNeeds,
      totalConsumed,
      type: "Needs",
    };
  }
  getWants() {
    const totalConsumed = this.allWants.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return {
      title: "Total Wants",
      balance: this.wants.toFixed(2),
      currentBalance: this.wants - totalConsumed,
      transactions: this.allWants,
      totalConsumed,
      type: "Wants",
    };
  }
  getSavings() {
    const totalConsumed = this.allSavings.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    return {
      title: "Total Savings",
      balance: this.savings.toFixed(2),
      currentBalance: totalConsumed - this.savings,
      transactions: this.allSavings,
      totalConsumed,
      type: "Savings",
    };
  }
  getResults() {
    return [this.getNeeds(), this.getWants(), this.getSavings()];
  }
  addTransaction(
    transaction: TransactionType,
    amount: number,
    name: string,
    description = ""
  ) {
    const newTransaction: Transaction = {
      amount: Number(amount),
      name,
      description,
      type: transaction,
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
  deleteTransaction(type: TransactionType, name: string) {
    switch (type) {
      case "Needs":
        this.allNeeds = this.allNeeds.filter((t) => t.name !== name);
        break;
      case "Wants":
        this.allWants = this.allWants.filter((t) => t.name !== name);
    }
    this.saveData();
  }
  saveData() {
    StorageService.getInstance().setNeeds(this.allNeeds);
    StorageService.getInstance().setWants(this.allWants);
  }
}
