import { Request, Response } from "express";
import JobModel from "../models/evaluation.model";

class ResultController {
  static async getResult(req: Request, res: Response){
    try {
      const id = req.params.id;
      const doc = await JobModel.findOne({ job_id: id }).lean();
      if(!doc) return res.status(404).json({ error: "job not found" });
      const response:any = { id: doc.job_id, status: doc.status };
      if(doc.status === "completed") response.result = doc.result;
      if(doc.status === "failed") response.error = doc.error;
      return res.json(response);
    } catch(err:any){
      console.error(err);
      res.status(500).json({ error: "failed to fetch result" });
    }
  }
}

export default ResultController;
