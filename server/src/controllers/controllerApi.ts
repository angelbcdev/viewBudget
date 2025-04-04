import { Request, Response } from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const config = {
  uri: process.env.MONGODB_URI || "",
  accountID: process.env.COLLECTION_ID || "",
};

let client: MongoClient | null = null;

const getClient = async () => {
  if (!client) {
    client = new MongoClient(config.uri);
    await client.connect();
  }
  return client;
};

if (!config.accountID) {
  throw new Error("COLLECTION_ID is not defined");
}

export type TransactionBudget = "Needs" | "Wants" | "Savings";
export type TransactionType = "Income" | "Expense" | "Savings";

export interface Transaction {
  id: string;
  amount: number;
  name: string;
  description: string;
  type: TransactionBudget;
  category: TransactionType;
}
let data: any = {
  balance: 2700,
  needs: [
    {
      id: "ff5c184s56h",
      amount: 1300,
      name: "Rent",
      description: "Rent for the month",
      type: "Needs",
      category: "Expense",
    },
  ],
  wants: [],
};

const getData = async () => {
  const mongoClient = await getClient();
  const database = mongoClient.db("finance_control").collection("budget");
  const result = await database
    .find({ _id: new ObjectId(config.accountID) })
    .toArray();
  return result;
};

const saveData = async (data: any) => {
  const mongoClient = await getClient();
  const database = mongoClient.db("finance_control").collection("budget");

  await database.updateOne(
    { _id: new ObjectId(config.accountID) },
    { $set: { needs: data.needs, wants: data.wants, balance: data.balance } }
  );
};

export const controllerApi = {
  getAll: async (req: Request, res: Response) => {
    try {
      const data = await getData();
      res.json(data[0]);
    } catch (error) {
      console.error("Error getting data:", error);
      res.status(500).json({ error: "Error getting data" });
    }
  },
  saveData: async (req: Request, res: Response) => {
    try {
      const newData = req.body;

      await saveData(newData);
      res.json({ message: "Data saved" });
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).json({ error: "Error saving data" });
    }
  },
};
