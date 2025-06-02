import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import UserRoute from "./routes/UserRoute.js";
import Plant from "./models/Plant.js";
import PlantLog from "./models/PlantLog.js";
import PlantLogRoute from "./routes/PlantLogRoute.js";
import PlantRoute from "./routes/PlantRoute.js";


// Setup Relasi
Plant.hasMany(PlantLog, { foreignKey: "plantId" });
PlantLog.belongsTo(Plant, { foreignKey: "plantId" });

export { Plant, PlantLog };


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "https://notes-frontend-daino-dot-prak-tcc-1-450606.uc.r.appspot.com"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());
app.use(express.json());

// Routes
app.use(UserRoute);
app.use(PlantRoute);
app.use(PlantLogRoute);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

app.listen(PORT, () =>
  console.log(`Server berjalan di http://localhost:${PORT}`)
);
