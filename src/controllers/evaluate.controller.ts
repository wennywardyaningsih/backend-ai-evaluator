import { Request, Response } from "express";
import EvaluateService from "../services/evaluate.service";

class EvaluateController {
  static async evaluateSync(req: Request, res: Response){
    try {
      const { jobTitle, cvFileId, reportFileId } = req.body;
      if(!jobTitle || !cvFileId || !reportFileId){
        return res.status(400).json({ error: "jobTitle, cvFileId, reportFileId are required" });
      }
      const job = await EvaluateService.createAndRun(jobTitle, cvFileId, reportFileId);
      return res.status(200).json(job);
    } catch(err:any){
      console.error(err);
      res.status(500).json({ error: "evaluation failed", detail: err.message });
    }
  }
}

export default EvaluateController;
