import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");

class FileService {
  static async saveFiles(cv:any, report:any){
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const cvId = uuidv4() + path.extname(cv.originalname || ".pdf");
    const reportId = uuidv4() + path.extname(report.originalname || ".pdf");
    await fs.rename(cv.path, path.join(UPLOAD_DIR, cvId));
    await fs.rename(report.path, path.join(UPLOAD_DIR, reportId));
    return {
      cv: cvId,
      report: reportId
    };
  }
}

export default FileService;
