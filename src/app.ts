import express from "express";
import uploadRoutes from "./routes/upload.routes";
import evaluateRoutes from "./routes/evaluate.routes";
import resultRoutes from "./routes/result.routes";
import { json, urlencoded } from "express";

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/upload", uploadRoutes);
app.use("/evaluate", evaluateRoutes);
app.use("/result", resultRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;
