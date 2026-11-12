# AI Mock Interviewer

Built for the Turners Car Insurance project (Mission 3).

## Features

- Free-text job title box (locked once the interview starts)
- Transcript that shows the interviewer's questions and your answers
- 7 questions in total, written by the AI to suit the job title and your answers
- Feedback at the end on how you did and how to improve

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express
- AI: Google Gemini API (`@google/genai`)

## Prerequisites

- Node.js 
- Git 
- A free Gemini API key from [Google AI Studio](https://aistudio.google.com/)

## Setup

1. Clone the repo:

```
git clone https://github.com/jpmissionready/L5-Mission-3
cd L5-Mission-3
```

2. Create a `.env` file in the `backend` folder:

```
API_KEY_GEMINI=your_key_here
GEMINI_MODEL=gemini-3.8-flash
```

3. Install and start the backend:

```
cd backend
npm install
node server.js
```

The backend runs on http://localhost:4000.

4. In a second terminal, install and start the frontend:

```
cd frontend
npm install
npm run dev
```

5. Open the link Vite shows in the terminal

Both the backend and the frontend need to be running at the same time.

## How to use

1. Type the job title you want to practise for.
2. Answer "Tell me about yourself." in the answer box and click Submit.
3. Keep answering the interviewer's questions (max 7). 
4. After the last question, read your feedback.

## Troubleshooting

- **Too many requests (429):** the free Gemini plan only allows a few requests a minute and a limited number a day. Wait a minute and try again.
- **Model is overloaded (503):** Google's servers are busy. Wait and try again, or change `GEMINI_MODEL` in `.env`.
- **Changed `.env` or `vite.config.js`:** restart the server for the change to work.

## Team

JP, Johannes, Nikhil
