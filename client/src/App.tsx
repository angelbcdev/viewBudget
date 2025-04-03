import { DashboardPage } from "./pages/Dashboard";
import Dexie, { Table } from "dexie";
console.log(import.meta.env.VITE_MONGODB_URI);

const url = import.meta.env.VITE_MONGODB_URI;

// const client = new MongoClient(url);

export class FinanceDatabase extends Dexie {
  constructor() {
    super("financeDB");
    this.version(1).stores({
      transactions: "++id, amount, type, category, date",
      categories: "++id, name, type, budget, current",
    });
  }
}

async function main() {
  try {
    const db = new FinanceDatabase();
    console.log("url", db);
    // await client.connect();
    // const collections = await client.db("TodoList").collections(); // get all collections
    // const collections = await client
    //   .db("budget")
    //   .collection("general")
    //   .findOne({})
    //   .then((res) => {
    //     console.log("res", res);
    //   });

    // const db = client.db("TodoList");
    // const collection = db.collection("user");
    // const result = collection.find();
    // const user = await result.toArray();
    // const result = await collection.insertOne({
    //   name: "angel",
    //   age: 20,
    //   status: "A",
    //   groups: ["Sports", "Dance", "Music"],
    // });

    console.log("Connected successfully to server");
    // console.log("collections", client);
    // console.log("collections", user[0].groups);

    // collections.forEach((element) => {
    //   console.log("element--", element);
    // });
  } catch (error) {
    console.log("error", error);
  } finally {
    //  await client.close();
  }
}
main();

function App() {
  // const { totals, loading, error } = useBudget();
  // console.log("totals", totals);
  // console.log("loading", loading);
  // console.log("error", error);

  return (
    <section className="bg-slate-900 h-screen w-[430px] fixed top-0 left-0">
      <DashboardPage />
    </section>
  );
}

export default App;
