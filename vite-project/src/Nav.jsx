import "./Nav.css";
import munchLogo from "../assets/munchLogo.png";

export default function Nav() {
  return (
    <nav className="logo-row">
      <div style={{ display: "flex" }}>
        <img src={munchLogo} className="logo" alt="" />
        <h1 id="navTitle">Munch</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ul id="navBar">
          <li className="navItem"><a href="#home">Home</a></li>
          <li className="navItem">
            <a href="#about">About</a>
          </li>
          <li className="navItem">Contact</li>
        </ul>
      </div>
    </nav>
  );
}
