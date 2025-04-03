import { useEffect, useState } from "react";
import { getGradualColor } from "../utils/getGradualColor";
import {
  CardDetails,
  DataManager,
  Transaction,
  TransactionType,
} from "../data/mockData";

const dataManager = DataManager.getInstance();

export const Home = () => {
  const [selectedCard, setSelectedCard] = useState<CardDetails>(" ");

  useEffect(() => {
    console.log("dataManager", dataManager);
  }, [dataManager]);

  const handleDelete = ({
    name,
    type,
  }: {
    name: string;
    type: TransactionType;
  }) => {
    dataManager.deleteTransaction(type, name);
    const newKeyCard = Math.random();
    setKeyCard(newKeyCard);
  };

  const [keyCard, setKeyCard] = useState(0);

  return (
    <section className="relative p-4">
      <CardHeader title="Total " balance={dataManager.totalBalance} />
      <div className="h-[490px] w-[105%] pr-4 overflow-hidden">
        {dataManager.getResults().map((data, index) => (
          <Card
            key={keyCard + index}
            data={data}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
};

const Card = ({
  data: { title, balance, currentBalance, transactions, totalConsumed },
  selectedCard,
  setSelectedCard,
  handleDelete,
}: {
  data: {
    title: string;
    balance: number;
    currentBalance: number;
    transactions: Transaction[];
    totalConsumed: number;
  };
  selectedCard: CardDetails;
  setSelectedCard: (card: CardDetails) => void;
  handleDelete: ({
    name,
    type,
  }: {
    name: string;
    type: TransactionType;
  }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(selectedCard == title);
  const percentage = (currentBalance / balance) * 100;

  const color = title == "Total Savings" ? "#fff" : getGradualColor(percentage);

  const getBGColor = () => {
    switch (title) {
      case "Total Needs":
        return { backgroundColor: "#9f1212", top: isOpen ? 0 : 0 };
      case "Total Wants":
        return { backgroundColor: "#0000ff", top: isOpen ? -128 : 0 };
      case "Total Savings":
        return { backgroundColor: "#008000", top: isOpen ? -256 : 0 };
    }
  };

  useEffect(() => {
    setIsOpen(selectedCard == title);
  }, [selectedCard]);

  return (
    <div
      style={getBGColor()}
      className={`${
        selectedCard == " " ? "shadow-[5px_5px_4px_#00000050]" : "  "
      }
        w-[390px] mx-auto relative ${
          isOpen
            ? " h-[460px]  z-10 shadow-[5px_5px_4px_#00000050] "
            : " h-28  z-0 "
        } rounded-md  p-4 my-4 transition-all duration-300 linear `}
      onClick={() => {
        if (isOpen) {
          setSelectedCard(" ");
        } else {
          setSelectedCard(title as CardDetails);
        }
      }}
    >
      <p className="text-md text-[#f5f0f0]">{title}</p>

      <div className="flex justify-end items-center">
        <p style={{ color }} className="text-4xl font-bold pl-2 text-[#f5f0f0]">
          {currentBalance}
        </p>
        <p className="text-4xl font-bold pl-2">/ {balance}</p>
      </div>

      <TransactionCard
        isOpen={isOpen}
        transactions={transactions}
        totalConsumed={totalConsumed}
        handleDelete={handleDelete}
      />
    </div>
  );
};

const CardHeader = ({ title, balance }: { title: string; balance: number }) => {
  return (
    <div className="bg-white h-20 rounded-md text-[#484848] p-4 my-4 flex justify-between items-center shadow-[5px_5px_4px_#00000050]">
      <p className="text-4xl font-bold ">{title}</p>
      <div className="flex justify-end items-center">
        <p className="text-4xl font-bold pl-2">{balance}</p>
      </div>
    </div>
  );
};

const TransactionCard = ({
  isOpen,
  transactions,
  totalConsumed,
  handleDelete,
}: {
  isOpen: boolean;
  transactions: Transaction[];
  totalConsumed: number;
  handleDelete: ({
    name,
    type,
  }: {
    name: string;
    type: TransactionType;
  }) => void;
}) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`w-full bg-white rounded-md gap-4 relative ${
        isOpen ? "h-[350px] opacity-100" : "h-0 opacity-0"
      } transition-all duration-300 my-4 p-4 linear`}
    >
      {isOpen && (
        <div className="flex flex-col gap-4">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between pl-9 items-center relative"
            >
              <span
                onClick={() =>
                  handleDelete({
                    name: transaction.name,
                    type: transaction.type,
                  })
                }
                className="text-2xl font-bold absolute top-0 left-0 cursor-pointer"
              >
                *
              </span>
              <p>{transaction.name}</p>
              <p>{transaction.amount}.00</p>
            </div>
          ))}
          <div className="flex justify-end gap-6 items-center border-t-2 border-gray-300 pt-4 text-xl mb-2 absolute bottom-0 left-0 right-0 mx-4">
            <p>Total</p>
            <p>{totalConsumed}.00</p>
          </div>
        </div>
      )}
    </div>
  );
};
