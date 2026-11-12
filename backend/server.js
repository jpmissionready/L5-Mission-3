import "dotenv/config.js";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { buildQuestionPrompt } from "./prompts.js";

const Total_Questions = 7;
const Model = process.env.GEMINI_MODEL;

// Talk to Gemini
const app = express();
const genai = new GoogleGenAI({ apiKey: process.env.API_KEY_GEMINI });

// await main();
// Commented out above as can't node server.js otherwise to test
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

/**
 * Validates the chat history sent by the frontend to prevent malformed data or tampering.
 */
function chatIsValid(messages) {
  // Ensure messages is a valid array
  if (!Array.isArray(messages)) return false;

  if (messages.length < 2 || messages.length % 2 !== 0) return false;
  if (messages.length > Total_Questions * 2) return false;

  // m is (message)
  // Check every single message object in the array
  return messages.every((m, index) => {
    // Even indexes (0, 2, 4...) must be the "interviewer"; odd indexes (1, 3, 5...) must be the "candidate"
    const expectedRole = index % 2 == 0 ? "interviewer" : "candidate";
    return (
      m &&
      m.role === expectedRole && // Role matches the alternating turn order
      typeof m.text === "string" && // Message content is a string
      m.text.trim() !== "" && // Message is not blank/whitespace
      m.text.length <= 2000 // Prevents overly long inputs
    );
  });
}

// Validate that jobTitle is a non-empty string under 50 characters
app.post("/api/interview", async (req, res) => {
  const { jobTitle, messages } = req.body ?? {};

  if (
    typeof jobTitle !== "string" ||
    jobTitle.trim() === "" ||
    jobTitle.length > 50
  ) {
    return res.status(400).json({ error: "Please enter a job title." });
  }
  // Validate the structure and rules of the conversation history
  if (!chatIsValid(messages)) {
    return res.status(400).json({ error: "Invalid conversation" });
  }
  // Remove leading/trailing whitespace from the job title
  const title = jobTitle.trim();

  const questionsAsked = messages.filter(
    (m) => m.role === "interviewer",
  ).length;

  // If the interview has reached the 7-question limit, end the session immediately
  if (questionsAsked >= Total_Questions) {
    return res.json({
      reply: "Thank you for completing the interview",
      finished: true,
    });
  }

  // Calculate the number of the upcoming question
  const questionNumber = questionsAsked + 1;

  // Generate the system rules/persona for Gemini based on the job title and current question count
  const systemInstruction = buildQuestionPrompt(
    title,
    questionNumber,
    Total_Questions,
  );

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
  // Map your app's roles ("interviewer" / "candidate") to Gemini's expected roles ("model" / "user")
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
    // Guard against the API returning an empty response
    if (!response.text) {
      throw new Error("Empty reply from Gemini");
    }
    // Send the generated question back to the frontend, flagging if this was the final question
    res.json({
      reply: response.text.trim(),
      finished: questionNumber === Total_Questions,
    });
  } catch (err) {
    // Log the detailed error on the server for debugging
    console.error("Gemini error:", err);
    // Handle API rate-limiting specifically with a 429 status code
    if (err.status === 429) {
      return res.status(429).json({ error: "Too many requests." });
    }
    // Return a generic 500 error message for any other API failure
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
