import InfoIcon from "@mui/icons-material/Info";
import React, { useState } from "react";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import logo from "../navbarLogo.png";

function Home() {
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);

  const handleButtonClick = () => {
    setIsPrivacyVisible(!isPrivacyVisible);
  };

  return (
    <div>
      <div className="Background">
        <div className="homeLogoContainer">
          <img className="homeLogo" src={logo} alt="drawful logo"/>
        </div>

        <div className="DrawingsBox">
          <Link to="/drawing" className="Drawings">
            <BsFillPencilFill className="Pen1"></BsFillPencilFill>
              Draw here
            <BsFillPencilFill className="Pen2"></BsFillPencilFill>
          </Link>
        </div>
        <div className="disclaimer1">
          "Alpha Project Disclaimer This server is provided by the School of
          Computer Science at the University of Birmingham to allow users to
          provide feedback on software developed by students as part of an
          assignment. While we take reasonable precautions, we cannot guarantee
          the security of the data entered into the system. Do NOT enter any real
          personal data (e.g., financial information or otherwise) into the
          system. The assignment runs until May 31st 2023, at which time the
          server and all associated data will be destroyed."
        </div>


        <div className="privacyInfoButtonDiv" >
        <InfoIcon
          className="privacyInfoButton" aria-label="Drawful Privacy Policy"
          onClick={handleButtonClick}
          style={{ fontSize: 50 }}
          tabIndex={0}
          role="button"
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              handleButtonClick();
            }
          }}
        >
          Toggle Privacy
        </InfoIcon>
      </div>

      <div>
        {isPrivacyVisible && (
          <div className="privacy">
            <h1 className="privacyHeading">Drawful Privacy Policy</h1>
            <br></br>
            <div>
              This privacy policy will explain how Drawful uses the personal
              data we collect from you when you use our website.<br></br>
              <br></br>
              Topics:<br></br>- What data do we collect?<br></br>- How do we
              collect your data?<br></br>- How will we use your data?<br></br>-
              How do we store your data?<br></br>- Marketing<br></br>- What are
              your data protection rights?<br></br>- What are cookies?<br></br>-
              How do we use cookies?<br></br>- What types of cookies do we use?
              <br></br>- How to manage your cookies<br></br>- Privacy policies
              of other websites
              <br></br>- Changes to our privacy policy<br></br>- How to contact
              us
              <br></br>- How to contact the appropriate authorities<br></br>
              <br></br>
              What data do we collect?<br></br>
              Drawful collects the following data:<br></br>- Email<br></br>-
              Password<br></br>- Username<br></br>- Real name<br></br>- Age
              <br></br>
              <br></br>
              How do we collect your data?<br></br>
              You directly provide Drawful with all of the data we collect. We
              collect data and process data when you:<br></br>- In order to make
              an account, you are required to provide username email and a
              password
              <br></br>- Have the choice in settings to add your real name to
              your account<br></br>
              <br></br>
              How will we use your data?<br></br>
              Drawful collects your data so that we can:<br></br>- Identify you
              when you log on<br></br>- Display your drawing and provide credit
              to your account<br></br>- Can keep your streak, badges and profile
              details saved<br></br>- Keep a your friends list and friend
              requests<br></br>- If you forget your password, we will use your
              email to send an email allowing you to reset your account password
              <br></br>
              Drawful does not share your data with any partner companies.
              <br></br>
              <br></br>
              How do we store your data?<br></br>
              Drawful securely stores your data at a server in a VM provided by
              The University of Birmingham and we are hashing passwords<br></br>
              using Argon2Id to ensure that passwords cannot be taken.<br></br>
              User data will be encrypted then using AES-256, before being
              stored in the database.<br></br>
              Drawful will keep your email indefinitely until manually deleted
              by the user. <br></br>
              The user can manually delete their account and therefore their
              email tied to the account.<br></br>
              <br></br>
              Marketing<br></br>
              Drawful will not send you any kind of marketing.<br></br>
              <br></br>
              What are your data protection rights?<br></br>
              Drawful would like to make sure you are fully aware of all of your
              data protection rights.<br></br>
              Every user is entitled to the following:<br></br>
              The right to access - You have the right to request Drawful for
              copies of your personal data. We may charge you a small fee for
              this service.
              <br></br>
              The right to rectification - You have the right to request that
              Drawful correct any information you believe is inaccurate.
              <br></br>
              You also have the right to request Drawful to complete information
              you believe is incomplete.<br></br>
              The right to erasure - You have the right to request that Drawful
              erase your personal data, under certain conditions.<br></br>
              The right to restrict processing - You have the right to request
              that Drawful restrict the<br></br>
              processing of your personal data, under certain conditions.
              <br></br>
              The right to object to processing - You have the right to object
              to Drawful processing of your personal data, under certain
              conditions.
              <br></br>
              The right to data portability - You have the right to request that
              Drawful transfer the data<br></br>
              that we have collected to another organisation, or directly to
              you, under certain conditions.<br></br>
              If you make a request, we have one month to respond to you. If you
              would like to exercise<br></br>
              any of these rights, please contact us with the information at the
              bottom of this document.<br></br>
              <br></br>
              What are cookies?<br></br>
              Cookies are text files placed on your computer to collect standard
              Internet log information<br></br>
              and visitor behaviour information. When you visit our websites, we
              may collect information<br></br>
              from you automatically through cookies or similar technology. For
              further information, visit allaboutcookies.org.<br></br>
              <br></br>
              How do we use cookies?<br></br>
              Drawful uses cookies in a range of ways to improve your experience
              on our website, including<br></br>- Keeping you signed in<br></br>
              - What language you chose<br></br>- Any accessibility changes you
              made
              <br></br>
              <br></br>
              What types of cookies do we use?<br></br>
              There are a number of different types of cookies, however, our
              website uses:<br></br>- Functionality - Drawful uses these cookies
              so that we recognize you on our website<br></br>
              so we can keep you signed in and remember your previously selected
              accessibility / language preferences. Drawful only uses first
              party cookies.<br></br>
              <br></br>
              How to manage cookies<br></br>
              You can set your browser not to accept cookies, and the above
              website tells you how to<br></br>
              remove cookies from your browser. However, in a few cases, some of
              our website features may not function as a result.<br></br>
              <br></br>
              Privacy policies of other websites<br></br>
              The Drawful website contains links to other websites. Our privacy
              policy applies only to<br></br>
              our website, so if you click on a link to another website, you
              should read their privacy<br></br>
              policy.<br></br>
              <br></br>
              Changes to our privacy policy<br></br>
              Drawful keeps its privacy policy under regular review and places
              any updates on this web<br></br>
              page. This privacy policy was last updated on 13th March 2023
              <br></br>
              <br></br>
              How to contact us<br></br>
              If you have any questions about Drawful’s privacy policy, the data
              we hold on you, or you<br></br>
              would like to exercise one of your data protection rights, please
              do not hesitate to contact us.<br></br>
              <br></br>
              Email us at: draw4team@gmail.com<br></br>
              Call us: +44 (0)121 414 3344<br></br>
              Or write to us at:<br></br>
              The School of Computer Science<br></br>
              The University of Birmingham<br></br>
              Edgbaston<br></br>
              Birmingham<br></br>
              B15 2TT<br></br>
              United Kingdom<br></br>
              <br></br>
              How to contact the appropriate authority<br></br>
              Should you wish to report a complaint or if you feel that Our
              Company has not addressed<br></br>
              your concern in a satisfactory manner, you may contact the
              Information Commissioner's<br></br>
              <br></br>
              Office:<br></br>
              Make a complaint: https://ico.org.uk/make-a-complaint/<br></br>
              Call: 0303 123 1113
            </div>
          </div>
        )}
      </div>











      </div>
      
      
      
      
      

      

      

      
    </div>
  );
}
export default Home;
