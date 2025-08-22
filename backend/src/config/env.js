import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/msme_pm",
  MODEL_SERVER_URL: process.env.MODEL_SERVER_URL || "http://localhost:8000",
  JWT_SECRET: process.env.JWT_SECRET || "dev",
  NODE_ENV: process.env.NODE_ENV || "development",
};
