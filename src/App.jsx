import { useState } from "react";

// From Turners
import iconShieldedLogo from "./assets/shielded.co.nz.png";
// import iconBranchDetails from "";
// import iconFacebook from "";
// import iconNewsletter from "";
// import iconEmailAlerts from "";
// import iconInstagram from "";





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
          <a href="https://www.turners.co.nz/?activetab=carsearch" target="_blank">Cars</a>
          <a href="https://www.turners.co.nz/Trucks-Machinery/?" target="_blank">Trucks & Machinery</a>
          <a href="https://www.turners.co.nz/Damaged-Vehicles/?" target="_blank">Damaged & End of Life</a>
          <a href="https://www.turners.co.nz/motorcycles-scooters/?sortorder=0&pagesize=20&pageno=1" target="_blank">Motorcycles</a>
          <a href="https://www.turners.co.nz/General-Goods/?" target="_blank">Buses, Caravans & Motorhomes</a>
          <a href="https://www.turners.co.nz/buses-caravans/?sortorder=7&pagesize=20&pageno=1" target="_blank">Boats & Marine</a>
          <a href="#">AI Interviewer</a>
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
        <p>(C) 2026 Turners Auctions. All Rights Reserved.</p>
        <a href="https://www.turners.co.nz/Company/Branches/" target="_blank">Branch Details</a>
        <a href="http://www.facebook.com/turnersNZ" target="_blank">Facebook</a>
        <a href="https://www.turners.co.nz/Company/email-alerts/email-newsletters/" target="_blank">Newsletter</a>
        <a href="https://www.turners.co.nz/Company/email-alerts/email-alerts/" target="_blank">Email Alerts</a>
        <a href="https://www.instagram.com/turners_cars" target="_blank">Instagram</a>
        <img src={iconShieldedLogo} alt="Women's Refuge Shield"></img>
      </footer>
      {/* ^^^ ========== ^^^ Irrelevant to the mission ^^^ ========== ^^^ */}
    </>
  );
}
