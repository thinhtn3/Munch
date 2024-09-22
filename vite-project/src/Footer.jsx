import "./Footer.css";
import geminiLogo from "./assets/geminiLogo.png";
import yelpFusionLogo from "./assets/yelpFusionLogo1.png";

export default function Footer() {
  return (
    <div id="footer">
      <h4 className="footerHeading">Powered By:</h4>
      <div id="footerImageContainer">
        <img src={geminiLogo} alt="geminiLogo" className="footerImage" />

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
