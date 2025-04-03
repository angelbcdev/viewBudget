import { MongoClient } from "mongodb";

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;

// npm i mongodb

// const url = "mongodb://root:password@localhost:27017/?tls=false";
const client = new MongoClient(MONGODB_URI);

export async function main() {
  try {
    await client.connect();
    // const collections = await client.db("TodoList").collections(); // get all collections
    const collections = await client
      .db("budget")
      .collection("general")
      .findOne({});
    const data = await collections?.toArray();
    // .find({ name: "angel" }, { id: 0, name: 0 })
    // .toArray();

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
    console.log("collections", data);
    // console.log("collections", user[0].groups);

    // collections.forEach((element) => {
    //   console.log("element--", element);
    // });
  } catch (error) {
    console.log("error", error);
  } finally {
    await client.close();
  }
}
