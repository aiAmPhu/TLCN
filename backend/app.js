import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adbRoutes from "./routes/adbRoutes.js";
import admRoutes from "./routes/admRoutes.js";
import permissionRoutes from "./routes/permissionRoutes.js";
import yearRoutes from "./routes/adyRoutes.js";
import adcRoutes from "./routes/adcRoutes.js";
import adrRoutes from "./routes/adrRoutes.js";
import adoRoutes from "./routes/adoRoutes.js";
import adqRoutes from "./routes/adqRoutes.js";
import jwtRoutes from "./routes/jwtRoutes.js";
import adiRoutes from "./routes/adiRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import learningPRoutes from "./routes/learningPRoutes.js";
import cors from "cors";
import transcriptRoutes from "./routes/transcriptRoutes.js";
import adwRoutes from "./routes/adwRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/adbs", adbRoutes);
app.use("/api/adms", admRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/adys", yearRoutes);
app.use("/api/adcs", adcRoutes);
app.use("/api/adrs", adrRoutes);
app.use("/api/ados", adoRoutes);
app.use("/api/adqs", adqRoutes);
app.use("/api/adis", adiRoutes);
app.use("/api/learning", learningPRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/jwt", jwtRoutes);
app.use("/api/transcripts", transcriptRoutes);
app.use("/api/wish", adwRoutes);
export default app;
