// backend/src/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js"; // ✅ Corrected path
import bcrypt from "bcryptjs";

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // check if user already exists
    const userExists = await User.findOne({ email: "admin@example.com" });
    if (userExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    // hash the password
    const hashedPassword = await bcrypt.hash("123456", 10);

    // create admin user
    const admin = await User.create({
      email: "admin@example.com",
      password: hashedPassword,
    });

    console.log("🎉 Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding user:", error);
    process.exit(1);
  }
};

seedUser();
