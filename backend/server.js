import express from "express";
import "dotenv/config";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
// Talk to Gemini

const app = express();
const genai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });
// const input = "How does AI work?";

// async function main() {
//   const interaction = await genai.interactions.create({
//     model: "gemini-3.8-flash",
//     input: input,
//     system_instruction: "Max reply length 5 sentences",
//   });
//   console.log(interaction.output_text);
// }

// await main();
// Commented out above as can't node server.js otherwise to test
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.post("/api/interview", (req, res) => {
  const data = req.body;
  // data should have a jobtitle and a message

  // create an interaction with genai api

  // Send response back
  res.status(200).json({});
});

app.use((err, req, res, next) => {
  res.status(400).json({ error: "there is an error" });
});

const PORT = process.env.PORT || 4000;
app
  .listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.error(err);
  });
