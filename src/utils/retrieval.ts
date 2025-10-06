import mongoose from "mongoose";

const RefSchema = new mongoose.Schema({
  type: String,
  title: String,
  content: String
});
const RefModel = mongoose.models.ReferenceDoc || mongoose.model("ReferenceDoc", RefSchema);

export async function getContext(type: string, query: string){
  try {
    const docs = await RefModel.find({ type }).limit(5).lean();
    if(!docs || docs.length === 0) return "No reference context available.";
    return docs.map((d:any)=>`Title: ${d.title}\n${d.content}`).join("\n---\n");
  } catch(err:any){
    console.warn("Retrieval error:", err.message);
    return "No reference context available.";
  }
}
