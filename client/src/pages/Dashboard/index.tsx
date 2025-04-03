import React from "react";
import { useDashboard } from "../../hooks/useDashboard";
import { Transaction } from "../../types/budget.types";

const StatCard: React.FC<{
  title: string;
  value: number;
  type: "income" | "expense" | "balance";
}> = ({ title, value, type }) => {
  const getColor = () => {
    switch (type) {
      case "income":
        return "text-green-600 bg-green-50";
      case "expense":
        return "text-red-600 bg-red-50";
      case "balance":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className={`p-6 rounded-lg ${getColor()}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className="mt-2 text-2xl font-semibold">
        ${Math.abs(value).toFixed(2)}
      </p>
    </div>
  );
};

const RecentTransactions: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>
          <span
            className={`font-medium ${
              transaction.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}$
            {transaction.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const TopCategories: React.FC<{
  categories: { name: string; amount: number; type: "income" | "expense" }[];
}> = ({ categories }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-medium mb-4">Top Categories</h3>
    <div className="space-y-4">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex items-center justify-between py-2 border-b last:border-0"
        >
          <div>
            <p className="font-medium">{category.name}</p>
            <p className="text-sm text-gray-500 capitalize">{category.type}</p>
          </div>
          <span
            className={`font-medium ${
              category.type === "income" ? "text-green-600" : "text-red-600"
            }`}
          >
            ${category.amount.toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export const DashboardPage: React.FC = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Income"
          value={stats.totalIncome}
          type="income"
        />
        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          type="expense"
        />
        <StatCard
          title="Current Balance"
          value={stats.balance}
          type="balance"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard
          title="Monthly Income"
          value={stats.monthlyIncome}
          type="income"
        />
        <StatCard
          title="Monthly Expenses"
          value={stats.monthlyExpenses}
          type="expense"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentTransactions transactions={stats.recentTransactions} />
        <TopCategories categories={stats.topCategories} />
      </div>
    </div>
  );
};
