import fs from "fs/promises";
import path from "path";
import pdfParse from "pdf-parse";
import { callLLM } from "../config/llm";
import { getContext } from "../utils/retrieval";

class PipelineService {
  static async extractTextFromFile(fileId:string){
    const filePath = path.resolve(process.cwd(), "uploads", fileId);
    const data = await fs.readFile(filePath);
    const parsed = await pdfParse(data);
    return parsed.text || "";
  }

  static async runPipeline({ jobId, cvFileId, reportFileId, jobTitle }: any){
    const cvText = await this.extractTextFromFile(cvFileId);
    const reportText = await this.extractTextFromFile(reportFileId);

    const jobContext = await getContext("job_description", jobTitle);
    const caseContext = await getContext("case_study", "case study");

    const cvPrompt = `
You are a technical HR assistant. Based on the job description context below and the candidate CV text, return a JSON object exactly like:
{
 "cv_match_rate": number (0-1),
 "cv_feedback": string
}

Job Description Context:
${jobContext}

Candidate CV:
${cvText}
    `;
    const cvResp = await callLLM(cvPrompt, 0.2);
    let cvResult:any;
    try { cvResult = JSON.parse(cvResp); } catch { cvResult = { cv_match_rate: 0.5, cv_feedback: cvResp }; }

    const projPrompt = `
You are a technical reviewer. Based on the case study brief context below and the project report text, return a JSON object exactly like:
{
 "project_score": number (1-5),
 "project_feedback": string
}

Case Study Context:
${caseContext}

Project Report:
${reportText}
    `;
    const projResp = await callLLM(projPrompt, 0.2);
    let projResult:any;
    try { projResult = JSON.parse(projResp); } catch { projResult = { project_score: 3, project_feedback: projResp }; }

    const summaryPrompt = `
Summarize the candidate evaluation in 3-5 sentences. Include strengths and main areas of improvement. Use the following data:
CV match rate: ${cvResult.cv_match_rate}
Project score: ${projResult.project_score}
CV feedback: ${cvResult.cv_feedback}
Project feedback: ${projResult.project_feedback}
    `;
    const overall_summary = await callLLM(summaryPrompt, 0.3);

    return {
      cv_match_rate: cvResult.cv_match_rate,
      cv_feedback: cvResult.cv_feedback,
      project_score: projResult.project_score,
      project_feedback: projResult.project_feedback,
      overall_summary
    };
  }
}

export default PipelineService;
