import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema({
  job_id: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  job_title: { type: String },
  files: {
    cv: String,
    report: String
  },
  result: Schema.Types.Mixed,
  error: String
}, { timestamps: true });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
