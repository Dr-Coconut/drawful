import { Box } from "@mui/system";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import drawings from "../drawingData.js";
import "../styles/Comments.css";

function Comments() {
  const {ID} = useParams();
  const post = drawings[ID]
  return (
    //<div style={{ fontSize: '25px', color: "white" }} >Badges</div>
    <div>
        <h1 className="Heading">
            Comments:
        </h1>
        <div className="CommentSection">
          {post.Comments.map((Comments,id) =>{
            return(
                <div className="CommentBar">
                    <div className="Username">
                      {Comments.UserCommenting}
                    </div>
                    <div className="CommentMesg">
                      {Comments.Comment}
                    </div>
                </div>
            )})}
          </div>
          <div className="CommentTextBox">
            <input type="text" placeholder="   Comment" />
          </div>
          
          <div className="SubCom">
            <Button>
              Send Comment
            </Button>
          </div>
        <div className="disclaimer1">
          "Alpha Project Disclaimer This server is provided by the School of Computer Science at the University of Birmingham to allow users to provide feedback on software developed by students as part of an assignment. While we take reasonable precautions, we cannot guarantee the security of the data entered into the system. Do NOT enter any real personal data (e.g., financial information or otherwise) into the system. The assignment runs until May 31st 2023, at which time the server and all associated data will be destroyed."
      </div>
     </div>
  )
}
        
export default Comments;
