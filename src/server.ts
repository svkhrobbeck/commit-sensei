import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";

// import { connectDB } from "./configs";

// routes

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// connectDB(); // connect to db

// endpoints

app.use("*", (req, res) => {
  res.status(404).json({ status: 404, message: "endpoint not found!" });
});

export default app;
