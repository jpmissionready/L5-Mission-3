export default function App() 
{
  return (
    <>
      {/* VVV ========== VVV Irrelevant to the mission VVV ========== VVV */}
      <navbar>         {/* Same as turners */}
        <h4>Cars | Trucks & Machinery | Damaged & End of Life | Motorcycles | General Goods |Buses, Caravans & Motorhomes | Boats & Marine</h4>
      </navbar>
      <br/><br/><br/><br/><br/>
      {/* ^^^ ========== ^^^ Irrelevant to the mission ^^^ ========== ^^^ */}




      <main>
        <div className="ai-interviewer">
          <h2>AI Mock Interviewer</h2>
          {/* Adding div for the Job Title + input bar so we can style it later */}
          <div>
            <label>Job Title: </label>
            <input type="text" placeholder="Enter your job title here"/>
          </div>  
          <div className="transcript">
            Box for transcript
            {/* Box for transcript */}
          </div>
          <div>
            <input type="text" placeholder="Talk to the Super Intelligence here"/> 
            <button>Submit</button>
          </div>
        </div>
      </main>








      {/* VVV ========== VVV Irrelevant to the mission VVV ========== VVV */}
      <br/><br/><br/><br/><br/>      
      <footer>
        <h4>Placeholder Footer</h4>
      </footer>
      {/* ^^^ ========== ^^^ Irrelevant to the mission ^^^ ========== ^^^ */}
    </>
  )
}
