import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import transactionRoutes from "./routes/transactionRoutes";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "client", "dist", "index.html")
  );
});

app.use("/api", transactionRoutes);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
