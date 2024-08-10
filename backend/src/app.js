import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import compayRoutes from "./routes/companyRoutes.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update the CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "https://nas-nfc-eqfi.vercel.app"],
    methods: "GET,HEAD,POST,DELETE,PUT,PATCH",
    credentials: true,
  })
);

app.use("/", userRoutes);
app.use("/admin", adminRoutes);
app.use("/company", compayRoutes);

connectDB();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port} and ${process.env.MONGO_URL}`);
});