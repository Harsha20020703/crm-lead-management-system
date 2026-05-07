const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();

connectDB();

const seedUser = async () => {
  try {
    const existingUser = await User.findOne({
      email: "admin@example.com",
    });

    if (existingUser) {
      console.log("Admin user already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = new User({
      email: "admin@example.com",
      password: hashedPassword,
    });

    await user.save();

    console.log("Admin user created");

    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedUser();