import { Transaction } from "../data/mockData";

enum StorageKeys {
  BALANCE = "finance_balance",
  NEEDS = "finance_needs",
  WANTS = "finance_wants",
  SAVINGS = "finance_savings",
}

export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }
  getBalance() {
    return JSON.parse(localStorage.getItem(StorageKeys.BALANCE) || "0");
  }
  setBalance(balance: number) {
    localStorage.setItem(StorageKeys.BALANCE, JSON.stringify(balance));
  }
  getNeeds() {
    return JSON.parse(localStorage.getItem(StorageKeys.NEEDS) || "null");
  }
  setNeeds(needs: Transaction[]) {
    localStorage.setItem(StorageKeys.NEEDS, JSON.stringify(needs));
  }
  getWants() {
    return JSON.parse(localStorage.getItem(StorageKeys.WANTS) || "null");
  }
  setWants(wants: Transaction[]) {
    localStorage.setItem(StorageKeys.WANTS, JSON.stringify(wants));
  }
}
