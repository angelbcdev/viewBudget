import { ObjectId } from "mongodb";

// Definimos los tipos base
export type CategoryType = "needs" | "wants" | "savings";
export type TransactionType = "income" | "expense";

// Interfaz para las transacciones
export interface Transaction {
  id?: number;
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: "needs" | "wants" | "savings";
}

// Interfaz para las subcategorías
export interface SubCategory {
  id: string;
  name: string;
  budget: number;
  current: number;
  transactions: Transaction[];
}

// Interfaz para las categorías principales
export interface BudgetCategory {
  type: CategoryType;
  title: string;
  totalBudget: number;
  currentAmount: number;
  percentage: number;
  subCategories: SubCategory[];
}

// Interfaz para el presupuesto completo
export interface Budget {
  totalBalance: number;
  categories: {
    needs: BudgetCategory;
    wants: BudgetCategory;
    savings: BudgetCategory;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  currency: string;
  theme: "light" | "dark";
}

export interface Category {
  id?: number;
  name: string;
  type: "needs" | "wants" | "savings";
  budget: number;
  current: number;
}
