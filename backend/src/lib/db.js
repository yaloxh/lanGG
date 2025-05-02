import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`подключились к базе данных: ${conn.connection.host}`);
  } catch (error) {
    console.log("ошибка при подключении к базе данных:", error);
    process.exit(1); // 1 means failure
  }
};
