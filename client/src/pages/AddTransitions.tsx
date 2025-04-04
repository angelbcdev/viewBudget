import { useState } from "react";
import {
  DataManager,
  fakeID,
  Transaction,
  TransactionBudget,
  TransactionBudgets,
  TransactionType,
} from "../data/mockData";
import LayoutContainer from "../layouts/LayoutContainer";

export const AddTransitions = ({ returnView }: { returnView: () => void }) => {
  const [category, setCategory] = useState<TransactionType>("Expense");
  const [from, setFrom] = useState<TransactionBudget>("Needs");
  const [dataToAdd, setDataToAdd] = useState<Transaction>({
    id: "",
    amount: Number(0),
    name: "",
    description: "",
    type: "Wants",
    category: category,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setDataToAdd({ ...dataToAdd, [name]: value });
  };

  const clearData = () => {
    setDataToAdd({
      id: "",
      amount: 0,
      name: "",
      description: "",
      type: "Wants",
      category: "Expense",
    });
  };
  const handleAddTransaction = () => {
    if (dataToAdd.amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (dataToAdd.name === "") {
      alert("Name is required");
      return;
    }
    const id = fakeID();
    if (!DataManager.instance) {
      alert("No data manager instance found");
      return;
    }
    const dataManager = DataManager.instance;
    if (category == "Expense") {
      dataManager.addTransaction({
        transaction: dataToAdd.type,
        amount: dataToAdd.amount,
        name: dataToAdd.name,
        description: dataToAdd.description,
        category: dataToAdd.category,
        id,
      });
    } else {
      //desde donde
      dataManager.addTransaction({
        transaction: from,
        amount: dataToAdd.amount,
        name: dataToAdd.name,
        description: dataToAdd.description,
        category: "Expense",
        id,
      });
      //asi se agrega la transferencia
      dataManager.addTransaction({
        transaction: dataToAdd.type,
        amount: dataToAdd.amount,
        name: dataToAdd.name,
        description: dataToAdd.description,
        category: "Income",
        id,
      });
    }
    clearData();
    returnView();
  };

  return (
    <LayoutContainer title="Add Transitions">
      <Input
        label="name"
        value={dataToAdd.name}
        onChange={handleChange}
        type="text"
      />
      <Input
        label="amount"
        value={dataToAdd.amount.toString()}
        onChange={handleChange}
        type="number"
      />
      <Input
        label="description"
        value={dataToAdd.description}
        onChange={handleChange}
        type="text"
      />
      <div className="flex flex-col gap-4 my-2">
        <div className="flex flex-row gap-4 my-4">
          <span className="text-sm font-medium w-20">Para</span>

          {TransactionBudgets.map((type) => (
            <button
              key={type}
              className={`${
                dataToAdd.type === type
                  ? "bg-blue-800 text-white"
                  : "bg-gray-500 text-white opacity-50"
              } px-4 py-2 rounded-md`}
              onClick={() =>
                (type !== from || category === "Expense") &&
                setDataToAdd({ ...dataToAdd, type })
              }
            >
              {type}
            </button>
          ))}
        </div>
        {category !== "Expense" && (
          <div className="flex flex-row gap-4 my-8">
            <span className="text-sm font-medium w-20">Desde</span>
            {TransactionBudgets.map((type2) => (
              <button
                key={type2}
                className={`${
                  from === type2
                    ? "bg-blue-800 text-white"
                    : "bg-gray-500 text-white opacity-50"
                } px-4 py-2 rounded-md`}
                onClick={() => type2 !== dataToAdd.type && setFrom(type2)}
              >
                {type2}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4 m-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-1"
          onClick={() =>
            category === "Expense"
              ? setCategory("Savings")
              : setCategory("Expense")
          }
        >
          {category === "Expense" ? "Gasto" : "Transferencia"}
        </button>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
        onClick={handleAddTransaction}
      >
        Add Transaction
      </button>
    </LayoutContainer>
  );
};

const Input = ({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex h-20  flex-col items-center justify-center ">
      <label className="text-sm font-medium relative">
        <span
          className={`text-gray-500 absolute  left-2 text-lg transition-all duration-300 ${
            isFocused || value != "" ? "-top-8" : "top-1"
          }`}
        >
          {label}
        </span>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type={type}
          name={label}
          value={value}
          // placeholder={label}
          onChange={onChange}
          className="w-[280px] h-10 rounded-md border border-gray-300 px-4 shadow-md  "
        />
      </label>
    </div>
  );
};
