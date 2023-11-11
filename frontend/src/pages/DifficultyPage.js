import { Link } from "react-router-dom";
import "../styles/Difficulty.css";
function DifficultyPage() {
  return (
    <div className="d-title">
      Choose a difficulty
      <div className="diff">
        <form action="/drawing" className="form">
          <input type="number" placeholder="Difficulty / 5" required />
          <br />
          <Link to="/drawing" className="DrawingLink">
            Start
          </Link>
        </form>
      </div>
      <div className="disclaimer1">
          "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
    </div>
  );
}
export default DifficultyPage;
//<input type="submit" value="Submit" />