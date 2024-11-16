import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adbRoutes from "./routes/adbRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/adbs", adbRoutes);
export default app;
