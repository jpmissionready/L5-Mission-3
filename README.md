# AI Mock Interviewer

Practise a job interview with an AI interviewer. Type a job title, answer the questions, and get feedback at the end.

Built with React + Vite (frontend), Express (backend) and the Google Gemini API.

## Setup

1. Create a `.env` file in the `backend` folder:

```
API_KEY_GEMINI=your_key_here
GEMINI_MODEL=gemini-3.8-flash (or your preffered model)
```

2. Start the backend:

```
cd backend
npm install
node server.js
```

3. In a second terminal, start the frontend:

```
cd frontend
npm install
npm run dev
```

4. Open the link Vite shows in the terminal.

Once you have reached 7 questions, it will provide you with a summary and feedback.
