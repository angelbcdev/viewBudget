import { DashboardPage } from "./pages/Dashboard";

import { useEffect } from "react";
import { budgetService } from "./services/budgetService";

function App() {
  useEffect(() => {
    budgetService.initializeData();
  }, []);

  return (
    <section className="bg-slate-900 h-screen w-[430px] fixed top-0 left-0">
      <DashboardPage />
    </section>
  );
}

export default App;
