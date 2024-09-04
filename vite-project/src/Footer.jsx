import "./Footer.css";
import geminiLogo from "./assets/geminiLogo.png";
import yelpFusionLogo from "./assets/yelpFusionLogo.png";

export default function Footer() {
  return (
    <div id="footer">
      <h4 style={{ color: "black", fontSize:"2em", letterSpacing:"3px" }}>Powered By:</h4>
      <div id="footerImageContainer">
        <img src={geminiLogo} alt="geminiLogo" className="footerImage" />
        {/* <h4 className="footerHeading">Powered by Gemini</h4>
        <p className="footingParagraph">
          Munch is powered by Google's Gemini API, an advanced image recognition
          API to enhance the user's experience to find restaurants to eat.
        </p> */}

        <img
          src={yelpFusionLogo}
          alt="Yelp Fusion Logo"
          className="footerImage"
        />
      </div>

      <span className="copyright">Copyright © 2024 MunchApp Inc.</span>
    </div>
  );
}
