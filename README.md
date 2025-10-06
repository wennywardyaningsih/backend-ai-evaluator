# Backend AI Evaluator - Final (MongoDB + OpenAI, synchronous)

This project is a final version scaffold for the case study:
- Express + TypeScript backend
- MongoDB (Mongoose) for jobs & reference docs
- OpenAI integration for evaluation (chat completions)
- Synchronous evaluation: POST /evaluate runs pipeline immediately (no Redis required)
- Ingestion script to load docs into MongoDB

Run:
1. npm install
2. copy .env.example to .env and set MONGODB_URI and OPENAI_API_KEY
3. npm run dev
4. Ingest reference docs: npm run ingest
5. Use endpoints:
   - POST /upload (multipart: cv, report) -> returns file ids
   - POST /evaluate (json: jobTitle, cvFileId, reportFileId) -> runs evaluation and returns job id + result
   - GET /result/:id -> fetch job status/result

Notes:
- Replace OpenAI model as needed. Keep temperature low for stability.
