import { useState } from "react";
import { DataManager, Transaction, TransactionTypes } from "../data/mockData";
import LayoutContainer from "../layouts/LayoutContainer";

const dataManager = DataManager.getInstance();
export const AddTransitions = ({ returnView }: { returnView: () => void }) => {
  const [dataToAdd, setDataToAdd] = useState<Transaction>({
    amount: Number(0),
    name: "",
    description: "",
    type: "Wants",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;

    setDataToAdd({ ...dataToAdd, [name]: value });
  };

  const clearData = () => {
    setDataToAdd({
      amount: 0,
      name: "",
      description: "",
      type: "Wants",
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

    if (dataToAdd.type) {
      dataManager.addTransaction(
        dataToAdd.type,
        dataToAdd.amount,
        dataToAdd.name,
        dataToAdd.description
      );
      clearData();
      returnView();
    }
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
      <div className="flex flex-row gap-4 my-8">
        {TransactionTypes.map((type) => (
          <button
            key={type}
            className={`${
              dataToAdd.type === type
                ? "bg-blue-800 text-white"
                : "bg-gray-500 text-white opacity-50"
            } px-4 py-2 rounded-md`}
            onClick={() => setDataToAdd({ ...dataToAdd, type })}
          >
            {type}
          </button>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-10"
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
