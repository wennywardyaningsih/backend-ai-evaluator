# 🧠 Backend AI Evaluator
Automated candidate evaluation system powered by **OpenAI** and **MongoDB**.

---

## 📋 Overview
**Backend AI Evaluator** adalah aplikasi backend berbasis **Node.js + TypeScript** untuk menilai **CV dan laporan proyek kandidat** secara otomatis.  
Sistem membaca file PDF, mengambil konteks dari dokumen referensi yang tersimpan di MongoDB, lalu menggunakan OpenAI untuk memberikan **skor dan feedback berbasis AI** secara real-time.

---

## ⚙️ Tech Stack
- **Express.js (TypeScript)** – RESTful API backend  
- **MongoDB (Mongoose)** – penyimpanan job & referensi dokumen  
- **OpenAI API (GPT-4o-mini)** – evaluasi berbasis LLM  
- **Multer** – upload file PDF  
- **pdf-parse** – ekstraksi teks dari CV & laporan proyek  

---

## 🧩 Main Features
| Endpoint | Method | Deskripsi |
|-----------|--------|------------|
| `/upload` | POST | Upload file CV & Project Report (PDF) |
| `/evaluate` | POST | Jalankan pipeline evaluasi (sinkron) |
| `/result/:id` | GET | Ambil hasil evaluasi kandidat |
| `/health` | GET | Cek status server |
| `npm run ingest` | CLI | Masukkan dokumen referensi ke MongoDB |

---

## 🧠 Evaluation Pipeline
1. **Ekstraksi teks** dari file PDF kandidat.  
2. **Ambil konteks** dari dokumen referensi (Job Description, Case Study, Rubric).  
3. **Evaluasi oleh OpenAI** menghasilkan skor & feedback:  
   - `cv_match_rate` & `cv_feedback`  
   - `project_score` & `project_feedback`  
   - `overall_summary` (ringkasan penilaian akhir)  
4. **Simpan hasil** di MongoDB untuk diambil lewat `/result/:id`.

---

## 📦 Project Structure
```
backend-ai-evaluator/
│
├── src/
│   ├── routes/          # API endpoints
│   ├── controllers/     # Logic layer
│   ├── services/        # LLM & file services
│   ├── models/          # MongoDB schemas
│   └── utils/           # Helper & retrieval utils
│
├── docs/                # Reference docs (job, case study, rubric)
├── scripts/             # Ingestion script
├── uploads/             # Uploaded files
├── .env.example
└── package.json
```

---

## 🚀 How to Run
```bash
# 1. Install dependencies
npm install

# 2. Copy environment config
cp .env.example .env

# 3. Isi konfigurasi
# MONGODB_URI=mongodb://localhost:27017/evaluator
# OPENAI_API_KEY=sk-xxxxxx

# 4. Ingest reference docs
npm run ingest

# 5. Jalankan server
npm run dev
```

---

## 🧾 Example Response
```json
{
  "id": "d2d98d83-44af-a8a9-8b6c1aabcd",
  "status": "completed",
  "result": {
    "cv_match_rate": 0.82,
    "project_score": 4,
    "overall_summary": "Kandidat memiliki kemampuan kuat di backend development."
  }
}
```

---

## 🔧 Future Enhancements
- Integrasi **BullMQ + Redis** untuk async queue  
- Tambah **ChromaDB** untuk vector retrieval  
- Autentikasi pengguna & dashboard hasil evaluasi  

---

## 👩‍💻 Author
**Wenny Wardyaningsih**  
📧 *wennie.mail@gmail.com*  
💼 Case Study – Backend Developer
