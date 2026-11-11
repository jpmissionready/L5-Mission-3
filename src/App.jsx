import { useState } from "react";

// From Turners
import iconShieldedLogo from "./assets/shielded.co.nz.png";
import turnersLogoHeader from "./assets/turners-logo.jpg";

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
          <a
            href="https://www.turners.co.nz/?activetab=carsearch"
            target="_blank"
          >
            Cars
          </a>
          <a
            href="https://www.turners.co.nz/Trucks-Machinery/?"
            target="_blank"
          >
            Trucks & Machinery
          </a>
          <a
            href="https://www.turners.co.nz/Damaged-Vehicles/?"
            target="_blank"
          >
            Damaged & End of Life
          </a>
          <a
            href="https://www.turners.co.nz/motorcycles-scooters/?sortorder=0&pagesize=20&pageno=1"
            target="_blank"
          >
            Motorcycles
          </a>
          <a href="https://www.turners.co.nz/General-Goods/?" target="_blank">
            Buses, Caravans & Motorhomes
          </a>
          <a
            href="https://www.turners.co.nz/buses-caravans/?sortorder=7&pagesize=20&pageno=1"
            target="_blank"
          >
            Boats & Marine
          </a>
          <a href="#">AI Interviewer</a>
        </h4>
      </navbar>
      <header>
        <a
          href="#"
          target="_blank"
        >
          {" "}
          <img
            src={turnersLogoHeader}
            alt="Turners Logo"
            className="headerLogo"
          />
        </a>
        <a
          href="https://www.turners.co.nz/Login/?ReturnUrl=/Cars/finance-insurance/car-insurance/"
          target="_blank"
        >
          <img src={userIcon} alt="User Icon" className="HeaderIcons"></img>
          LOGIN
        </a>
        <span> OR </span>
        <a href="https://www.turners.co.nz/Login/Registration/" target="_blank">
          REGISTER
        </a>
        <span className="phoneNumber">
          <img src={phoneIcon} alt="Phone Icon" className="HeaderIcons"></img>
          0800 887 637
        </span>
        <a
          className="findUs"
          href="https://www.turners.co.nz/Company/Branches/"
          target="_blank"
        >
          <img
            src={locationIcon}
            alt="Location Icon"
            className="HeaderIcons"
          ></img>
          Find Us
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
        <a
          href="https://www.turners.co.nz/Company/email-alerts/email-newsletters/"
          target="_blank"
        >
          <img src={iconMail} alt="Newsletter icon"></img>
          Newsletter
        </a>
        <a
          href="https://www.turners.co.nz/Company/email-alerts/email-alerts/"
          target="_blank"
        >
          <img src={iconMail} alt="Email icon"></img>
          Email Alerts
        </a>
        <a href="https://www.instagram.com/turners_cars" target="_blank">
          <img src={iconInstagram} alt="Instagram icon"></img>
          Instagram
        </a>
        <img src={iconShieldedLogo} alt="Women's Refuge Shield"></img>
      </footer>
      {/* ^^^ ========== ^^^ Irrelevant to the mission ^^^ ========== ^^^ */}
    </>
  );
}
