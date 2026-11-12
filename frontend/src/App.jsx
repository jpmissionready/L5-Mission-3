import { useState, useRef, useEffect } from "react";

// From Turners
import iconShieldedLogo from "./assets/shielded.co.nz.png";
import turnersLogoHeader from "./assets/turners-logo.png";

// From https://fontawesome.com/search?q=account&ic=free-collection
import iconBranchDetails from "./assets/branch.svg";
import iconFacebook from "./assets/facebook.svg";
import iconMail from "./assets/mail.svg";
import iconInstagram from "./assets/instagram.svg";
import userIcon from "./assets/user.svg";
import phoneIcon from "./assets/phone.svg";
import locationIcon from "./assets/location.svg";

// Placeholder content
import placeholderContent from "./assets/Placeholder.png";

export default function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    { id: 0, sender: "Interviewer", text: "Tell me about yourself." },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [finished, setFinished] = useState(false);

  // Scroll the transcript to the newest message
  const transcriptRef = useRef(null);
  useEffect(() => {
    transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [conversation, loading]);

  // Helper function to add messages to conversation array
  function appendToConversation(sender, text) {
    setConversation((prev) => [
      ...prev,
      { id: prev.length, sender: sender, text: text },
    ]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const answer = message.trim();
    if (!answer) return;

    // The full chat INCLUDING the new answer.
    // (State updates are not instant, so we build the list here.)
    const updatedConversation = [
      ...conversation,
      { id: conversation.length, sender: "Me", text: answer },
    ];

    // The server wants roles "interviewer" / "candidate" and a "text" field
    const messages = updatedConversation.map((msg) => ({
      role: msg.sender === "Interviewer" ? "interviewer" : "candidate",
      text: msg.text,
    }));

    setConversation(updatedConversation);
    setMessage(""); // clear the textbox
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle: jobTitle.trim(), messages }),
      });

      // If the server is down the body is empty, so .json() would crash
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          data.error || "The server is not responding. Is the backend running?",
        );
      }

      appendToConversation("Interviewer", data.reply);
      setFinished(data.finished);
    } catch (err) {
      // Undo: go back to the chat before this answer and put the text back
      setConversation(conversation);
      setMessage(answer);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleTitleChange(e) {
    setJobTitle(e.target.value);
  }
  function handleMessageChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {/* VVV ========================== VVV Not necessary for the mission VVV ========================== VVV */}
      {/* VVV ========================== VVV Not necessary for the mission VVV ========================== VVV */}
      <navbar>
        {/* Same as turners */}
        <h4>
          <a href="https://www.turners.co.nz/?activetab=carsearch" target="_blank" > Cars </a>
          <a href="https://www.turners.co.nz/Trucks-Machinery/?" target="_blank" > Trucks & Machinery </a>
          <a href="https://www.turners.co.nz/Damaged-Vehicles/?" target="_blank" > Damaged & End of Life </a>
          <a href="https://www.turners.co.nz/motorcycles-scooters/?sortorder=0&pagesize=20&pageno=1" target="_blank" > Motorcycles </a>
          <a href="https://www.turners.co.nz/General-Goods/?" target="_blank"> Buses, Caravans & Motorhomes </a>
          <a href="https://www.turners.co.nz/buses-caravans/?sortorder=7&pagesize=20&pageno=1" target="_blank" > Boats & Marine </a>
          <a href="#">AI Interviewer</a>
        </h4>
      </navbar>
      <header>
        <a href="#" target="_blank">
          <img src={turnersLogoHeader} alt="Turners Logo" className="headerLogo" />
        </a>
        <a href="https://www.turners.co.nz/Login/?ReturnUrl=/Cars/finance-insurance/car-insurance/" target="_blank" >
          <img src={userIcon} alt="User Icon" className="HeaderIcons"></img> LOGIN </a>
        <span> OR </span>
        <a href="https://www.turners.co.nz/Login/Registration/" target="_blank"> REGISTER </a>
        <span className="phoneNumber">
          <img src={phoneIcon} alt="Phone Icon" className="HeaderIcons"></img>
          0800 887 637
        </span>
        <a className="findUs" href="https://www.turners.co.nz/Company/Branches/" target="_blank" >
          <img src={locationIcon} alt="Location Icon" className="HeaderIcons" ></img> Find Us 
        </a>
      </header>
      <nav className="menubar">
        <div>
          <span>Find a Car</span>
          <span>How to Buy</span>
          <span>Spell your car</span>
          <span>Finance & Insurance</span>
          <span>Mobile Servicing</span>
        </div>
        <div>
          <span>Auctions</span>
          <span>More Info</span>
        </div>
      </nav>
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* ^^^ ========================== ^^^ Not necessary for the mission ^^^ ========================== ^^^ */}
      {/* ^^^ ========================== ^^^ Not necessary for the mission ^^^ ========================== ^^^ */}

      <main>
        <div className="ai-interviewer">
          <h2>AI Mock Interviewer</h2>
          {/* Adding div for the Job Title + input bar so we can style it later */}
          <form onSubmit={handleSubmit}>
            <div>
              <label>Job Title: </label>
              <input
                id="job-title"
                type="text"
                placeholder="Enter your job title here"
                value={jobTitle}
                onChange={handleTitleChange}
                disabled={conversation.length > 1}
                required
              />
            </div>
            <div className="transcript" ref={transcriptRef}>
              {conversation.map((msg) => (
                <p key={msg.id} className={msg.sender === "Me" ? "me" : ""}>
                  <strong>{msg.sender}: </strong>
                  {msg.text}
                </p>
              ))}
              {loading && <p className="thinking">Interviewer is typing...</p>}
            </div>
            {error && <p className="error">{error}</p>}
            {finished && (
              <p>Interview finished. Click "Start again" to practise again.</p>
            )}

            <div>
              <textarea
                rows={3}
                cols={80}
                placeholder="Talk to the Super Intelligence here"
                value={message}
                onChange={handleMessageChange}
                disabled={finished || loading}
                required
              />
              <button type="submit" disabled={finished || loading}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* VVV ========================== VVV Not necessary for the mission VVV ========================== VVV */}
      {/* VVV ========================== VVV Not necessary for the mission VVV ========================== VVV */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <img src={placeholderContent} className="placeholder-content"></img>
      <footer>
        {/* Footer Icons taken from https://fontawesome.com/ as we can't seem to download them directly from turners website.*/}
        {/* Need to figure out how to turn the icons red. */}
        <p>(C) 2026 Turners Auctions. All Rights Reserved.</p>
        <a href="https://www.turners.co.nz/Company/Branches/" target="_blank">
          <img src={iconBranchDetails} alt="House icon"></img>
          Branch Details
        </a>
        <a href="http://www.facebook.com/turnersNZ" target="_blank">
          <img src={iconFacebook} alt="Facebook icon"></img>
          Facebook
        </a>
        <a href="https://www.turners.co.nz/Company/email-alerts/email-newsletters/" target="_blank" >
          <img src={iconMail} alt="Newsletter icon"></img>
          Newsletter
        </a>
        <a href="https://www.turners.co.nz/Company/email-alerts/email-alerts/" target="_blank" >
          <img src={iconMail} alt="Email icon"></img>
          Email Alerts
        </a>
        <a href="https://www.instagram.com/turners_cars" target="_blank">
          <img src={iconInstagram} alt="Instagram icon"></img>
          Instagram
        </a>
        <img src={iconShieldedLogo} alt="Women's Refuge Shield"></img>
      </footer>
      {/* ^^^ ========================== ^^^ Not necessary for the mission ^^^ ========================== ^^^ */}
      {/* ^^^ ========================== ^^^ Not necessary for the mission ^^^ ========================== ^^^ */}
    </>
  );
}
