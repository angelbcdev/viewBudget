import { Request, Response } from "express";
import { Transaction, ITransaction } from "../models/Transaction";

export const transactionController = {
  async getAll(req: Request, res: Response) {
    try {
      const transactions = await Transaction.find().sort({ date: -1 });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching transactions" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const transaction = new Transaction(req.body);
      await transaction.save();
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Error creating transaction" });
    }
  },

  async getByType(req: Request, res: Response) {
    try {
      const { type } = req.params;
      const transactions = await Transaction.find({ type });
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching transactions" });
    }
  },

  async getTotals(req: Request, res: Response) {
    try {
      const totals = await Transaction.aggregate([
        {
          $group: {
            _id: "$type",
            total: { $sum: "$amount" },
          },
        },
      ]);
      res.json(totals);
    } catch (error) {
      res.status(500).json({ message: "Error calculating totals" });
    }
  },
};
