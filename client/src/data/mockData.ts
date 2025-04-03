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
const initialNeeds: Transaction[] = [
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
export class DataManager {
  private static instance: DataManager;
  totalBalance = 2700;
  needs = this.totalBalance * 0.6;
  currentsNeeds = 0;
  allNeeds: Transaction[] = initialNeeds;
  wants = this.totalBalance * 0.3;
  currentsWants = 0;
  allWants: Transaction[] = [
    {
      amount: 80,
      name: "Gasoline",
      description: "2 times a week",
      type: "Wants",
    },
  ];
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

  private constructor() {}
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
      balance: this.needs,
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
      balance: this.wants,
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
      balance: this.savings,
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
  }
  deleteTransaction(type: TransactionType, name: string) {
    switch (type) {
      case "Needs":
        this.allNeeds = this.allNeeds.filter((t) => t.name !== name);
        break;
      case "Wants":
        this.allWants = this.allWants.filter((t) => t.name !== name);
    }
  }
}
