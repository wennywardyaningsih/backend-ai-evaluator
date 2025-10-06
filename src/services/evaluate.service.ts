import JobModel from "../models/evaluation.model";
import PipelineService from "./pipeline.service";
import { v4 as uuidv4 } from "uuid";

class EvaluateService {
  static async createAndRun(jobTitle:string, cvFileId:string, reportFileId:string){
    const jobId = uuidv4();
    const doc = await JobModel.create({
      job_id: jobId,
      status: "processing",
      files: { cv: cvFileId, report: reportFileId },
      job_title: jobTitle
    });
    try {
      const result = await PipelineService.runPipeline({ jobId, cvFileId, reportFileId, jobTitle });
      await JobModel.updateOne({ job_id: jobId }, { status: "completed", result, updatedAt: new Date() });
      return { id: jobId, status: "completed", result };
    } catch(err:any){
      await JobModel.updateOne({ job_id: jobId }, { status: "failed", error: err.message });
      return { id: jobId, status: "failed", error: err.message };
    }
  }
}

export default EvaluateService;
