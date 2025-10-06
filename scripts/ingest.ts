import mongoose from "mongoose";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/evaluator";

const RefSchema = new mongoose.Schema({
  type: String,
  title: String,
  content: String
});
const RefModel = mongoose.models.ReferenceDoc || mongoose.model("ReferenceDoc", RefSchema);

async function ingest(){
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB for ingest");
  const docs = [
    { type: "job_description", title: "Product Engineer (Backend) - Rakamin", file: "docs/job_description.txt" },
    { type: "case_study", title: "Case Study Brief - Backend", file: "docs/case_study_brief.txt" },
    { type: "scoring_rubric", title: "Scoring Rubric", file: "docs/scoring_rubric.txt" }
  ];
  for(const d of docs){
    const p = path.resolve(d.file);
    try {
      const content = await fs.readFile(p, "utf8");
      await RefModel.create({ type: d.type, title: d.title, content });
      console.log("Ingested", d.file);
    } catch(err:any){
      console.warn("Failed to ingest", d.file, err.message);
    }
  }
  await mongoose.disconnect();
  console.log("Ingest completed");
}

ingest().catch(err=>{ console.error(err); process.exit(1); });
