import { useState } from "react";
import { Home } from "./Home";
import { AddTransitions } from "./AddTransitions";

import Settings from "./Settings";

type View = "Home" | "Add" | "Settings";
const viewOptions: View[] = ["Home", "Add", "Settings"];

export const DashboardPage = () => {
  const [view, setView] = useState<View>("Home");

  const returnView = () => {
    setView("Home");
  };

  return (
    <div>
      <Header />
      <main className=" bg-[#e9e6e6] ">
        {view === "Home" && <Home />}
        {view === "Add" && <AddTransitions returnView={returnView} />}
        {view === "Settings" && <Settings />}
      </main>
      <Footer {...{ view, setView }} />
    </div>
  );
};

const Footer = ({
  view,
  setView,
}: {
  view: View;
  setView: (view: View) => void;
}) => {
  return (
    <section className="h-[50px]  flex justify-between   items-center gap-4 px-4  relative">
      {viewOptions.map((item) => (
        <div
          className="text-2xl text-[#dcdada] bg w-[120px] text-center "
          onClick={() => setView(item)}
          key={item}
        >
          {item}
        </div>
      ))}
      <span
        style={{
          left: `${viewOptions.findIndex((item) => item === view) * 144}px`,
        }}
        className={`w-[144px] h-[4px] bg-white rounded-md absolute bottom-0 transition-all duration-300 ease-linear `}
      ></span>
    </section>
  );
};

const Header = () => {
  return <div>Header</div>;
};
