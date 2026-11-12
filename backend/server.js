import "dotenv/config.js";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { buildFeedbackPrompt, buildQuestionPrompt } from "./prompts.js";

const Total_Questions = 7;
const Model = process.env.GEMINI_MODEL;

// Talk to Gemini
const app = express();
const genai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

function chatIsValid(messages) {
  if (!Array.isArray(messages)) return false;
  if (messages.length < 2 || messages.length % 2 !== 0) return false;
  if (messages.length > Total_Questions * 2) return false;

  // m is (message)
  return messages.every((m, index) => {
    const expectedRole = index % 2 == 0 ? "interviewer" : "candidate";
    return (
      m &&
      m.role === expectedRole &&
      typeof m.text === "string" &&
      m.text.trim() !== "" &&
      m.text.length <= 2000
    );
  });
}

app.post("/api/interview", async (req, res) => {
  const { jobTitle, messages } = req.body ?? {};

  if (
    typeof jobTitle !== "string" ||
    jobTitle.trim() === "" ||
    jobTitle.length > 50
  ) {
    return res.status(400).json({ error: "Please enter a job title." });
  }
  if (!chatIsValid(messages)) {
    return res.status(400).json({ error: "Invalid conversation" });
  }
  const title = jobTitle.trim();

  const questionsAsked = messages.filter(
    (m) => m.role === "interviewer",
  ).length;
  const isLastAnswer = questionsAsked >= Total_Questions;

  const systemInstruction = isLastAnswer
    ? buildFeedbackPrompt(title)
    : buildQuestionPrompt(title, questionsAsked + 1, Total_Questions);

  const contents = [
    {
      role: "user",
      parts: [
        { text: `Please start the mock interview for the role of ${title}.` },
      ],
    },
  ];
  for (const m of messages) {
    contents.push({
      role: m.role === "interviewer" ? "model" : "user",
      parts: [{ text: m.text }],
    });
  }

  try {
    const response = await genai.models.generateContent({
      model: Model,
      contents,
      config: { systemInstruction },
    });
    if (!response.text) {
      throw new Error("Empty reply from Gemini");
    }
    res.json({ reply: response.text.trim(), finished: isLastAnswer });
  } catch (err) {
    console.error("Gemini error:", err);
    if (err.status === 429) {
      return res.status(429).json({ error: "Too many requests." });
    }
    res.status(500).json({ error: "The AI interviewer could not reply." });
  }
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
