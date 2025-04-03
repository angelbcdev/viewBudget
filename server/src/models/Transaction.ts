import mongoose, { Schema, Document } from "mongoose";

export interface ITransaction extends Document {
  amount: number;
  description: string;
  date: Date;
  category: string;
  type: "needs" | "wants" | "savings";
}

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["needs", "wants", "savings"],
  },
});

export const Transaction = mongoose.model<ITransaction>(
  "Transaction",
  TransactionSchema
);
