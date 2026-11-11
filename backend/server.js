import express from "express";
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
// Talk to Gemini

const app = express();
const genai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
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
