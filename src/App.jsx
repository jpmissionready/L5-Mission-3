import { useState } from "react";

export default function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Need to send the form info to the gemini api here
  }

  function handleTitleChange(e) {
    setJobTitle(e.target.value);
  }
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {/* VVV ========== VVV Irrelevant to the mission VVV ========== VVV */}
      <navbar>
        {/* Same as turners */}
        <h4>
          <a href="#">Cars </a>
          <a href="#">Trucks & Machinery </a>
          <a href="#">Damaged & End of Life </a>
          <a href="#">Motorcycles </a>
          <a href="#">Buses, Caravans & Motorhomes </a>
          <a href="#">Boats & Marine </a>
          <a href="#">AI Interviewer </a>
        </h4>
      </navbar>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* ^^^ ========== ^^^ Irrelevant to the mission ^^^ ========== ^^^ */}

      <main>
        <div className="ai-interviewer">
          <h2>AI Mock Interviewer</h2>
          {/* Adding div for the Job Title + input bar so we can style it later */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Job Title: </label>
              <input
                type="text"
                placeholder="Enter your job title here"
                onChange={handleTitleChange}
                required
              />
            </div>
            <div className="transcript">
              Box for transcript
              {/* Box for transcript */}
            </div>
            <div>
              <textarea
                type="text"
                rows={3}
                cols={80}
                placeholder="Talk to the Super Intelligence here"
                onChange={handleMessageChange}
                required
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </main>

      {/* VVV ========== VVV Irrelevant to the mission VVV ========== VVV */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <footer>
        <h4>Placeholder Footer</h4>
      </footer>
      {/* ^^^ ========== ^^^ Irrelevant to the mission ^^^ ========== ^^^ */}
    </>
  );
}
