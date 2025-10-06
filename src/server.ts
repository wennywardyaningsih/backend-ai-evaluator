import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/evaluator";

async function main(){
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB:", MONGODB_URI);
  app.listen(PORT, () => console.log(`Server listening ${PORT}`));
}

main().catch(err => {
  console.error("Startup error:", err);
  process.exit(1);
});
