import { Request, Response } from "express";
import FileService from "../services/file.service";

class UploadController {
  static async uploadFiles(req: Request, res: Response) {
    try {
      const files = req.files as any;
      if (!files || !files.cv || !files.report) {
        return res.status(400).json({ error: "cv and report are required" });
      }
      const cv = files.cv[0];
      const report = files.report[0];
      const fileRecord = await FileService.saveFiles(cv, report);
      return res.json(fileRecord);
    } catch (err:any) {
      console.error(err);
      res.status(500).json({ error: "upload failed" });
    }
  }
}

export default UploadController;
