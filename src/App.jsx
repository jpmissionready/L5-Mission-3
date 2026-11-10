import { useState } from "react";

export default function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Need to send the form info to the gemini api here
  }

  return (
    <>
      {/* VVV ========== VVV Irrelevant to the mission VVV ========== VVV */}
      <navbar>
        {/* Same as turners */}
        <h4>
          Cars | Trucks & Machinery | Damaged & End of Life | Motorcycles |
          General Goods |Buses, Caravans & Motorhomes | Boats & Marine
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
