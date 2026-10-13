import express from "express";
import cors from "cors";
import "dotenv/config";
import db from "./config/database.js";
import produkRoute from "./routes/produkRoute.js";
import kategoriRoute from "./routes/kategoriRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import kelasSayaRoute from "./routes/kelasSayaRoute.js";
import sertifikatRoute from "./routes/sertifikatRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import tutorRoute from "./routes/tutorRoute.js";
const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await db.raw("select 1");
    res.json({ server: "ok", database: "ok" });
  } catch (error) {
    res
      .status(500)
      .json({ server: "ok", database: "gagal", error: error.message });
  }
});
app.use("/api/tutor", tutorRoute);
app.use("/api/orders", orderRoute);
app.use("/api/produk", produkRoute);
app.use("/api/kategori", kategoriRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/kelas-saya", kelasSayaRoute);
app.use("/api/sertifikat", sertifikatRoute);
app.use("/api/review", reviewRoute);

app.use((error, req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  console.error(error);
  res.status(500).json({ message: "Terjadi kesalahan pada server." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    console.error("Server gagal berjalan:", error.message);
    process.exit(1);
  }
  console.log(`Server jalan di http://localhost:${PORT}`);
});
