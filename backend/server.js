import "dotenv/config.js";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { buildFeedbackPrompt, buildQuestionPrompt } from "./prompts.js";

// Set the maximum number of interview questions before giving final feedback
const Total_Questions = 7;
const Model = process.env.GEMINI_MODEL;

// Talk to Gemini
const app = express();
const genai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

/**
 * Validates the structure, length, and turn-taking order of the chat history.
 * Expects alternating turns starting with "interviewer" and ending with "candidate".
 */
function chatIsValid(messages) {
  // Ensure messages is a valid array
  if (!Array.isArray(messages)) return false;
  // Must have at least 1 Q&A pair (2 messages) and an even total (candidate just answered)
  if (messages.length < 2 || messages.length % 2 !== 0) return false;
  // Prevent conversations from exceeding the maximum allowed Q&A pairs
  if (messages.length > Total_Questions * 2) return false;

  // m is (message)
  // Check every message object in the array
  return messages.every((m, index) => {
    // Even indices (0, 2, 4...) must be the interviewer; odd indices (1, 3, 5...) must be the candidate
    const expectedRole = index % 2 == 0 ? "interviewer" : "candidate";
    return (
      m &&
      m.role === expectedRole &&
      typeof m.text === "string" &&
      m.text.trim() !== "" && // Message cannot be blank
      m.text.length <= 2000 // Enforce a 2,000-character limit per message
    );
  });
}

// Main API endpoint to handle ongoing mock interview turns
app.post("/api/interview", async (req, res) => {
  // Extract jobTitle and messages safely from the request body
  const { jobTitle, messages } = req.body ?? {};

  // Validate that jobTitle is a non-empty string of 50 characters or fewer
  if (
    typeof jobTitle !== "string" ||
    jobTitle.trim() === "" ||
    jobTitle.length > 50
  ) {
    return res.status(400).json({ error: "Please enter a job title." });
  }

  // Validate the chat history format using the helper function
  if (!chatIsValid(messages)) {
    return res.status(400).json({ error: "Invalid conversation" });
  }
  // Clean up leading/trailing whitespace from the job title
  const title = jobTitle.trim();

  // Count how many questions the AI interviewer has asked so far
  const questionsAsked = messages.filter(
    (m) => m.role === "interviewer",
  ).length;
  // Check if the candidate has just answered the final question

  const isLastAnswer = questionsAsked >= Total_Questions;

  // Choose the AI's persona/instructions: give final feedback if done, otherwise ask the next question
  const systemInstruction = isLastAnswer
    ? buildFeedbackPrompt(title)
    : buildQuestionPrompt(title, questionsAsked + 1, Total_Questions);

  // Format the conversation history for the Gemini API.
  // Gemini requires conversations to start with a "user" role message, so we seed it with an initial prompt.
  const contents = [
    {
      role: "user",
      parts: [
        { text: `Please start the mock interview for the role of ${title}.` },
      ],
    },
  ];

  // Map our app's roles ("interviewer"/"candidate") to Gemini's expected roles ("model"/"user")
  for (const m of messages) {
    contents.push({
      role: m.role === "interviewer" ? "model" : "user",
      parts: [{ text: m.text }],
    });
  }

  try {
    // Send the conversation history and system instructions to the Gemini model
    const response = await genai.models.generateContent({
      model: Model,
      contents,
      config: { systemInstruction },
    });
    // Guard against empty responses from the API
    if (!response.text) {
      throw new Error("Empty reply from Gemini");
    }
    // Return the AI's response and indicate whether the interview has concluded
    res.json({ reply: response.text.trim(), finished: isLastAnswer });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Gemini error:", err);
    // Handle API rate-limiting specifically with HTTP 429
    if (err.status === 429) {
      return res.status(429).json({ error: "Too many requests." });
    }
    // Return a generic 500 error for all other API failures
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
