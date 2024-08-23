import { React } from "react";
import munchLogo from "../assets/munchLogo.png"
import "./App.css";
import LocationForm from "./LocationForm";
import Footer from "./Footer";
import Typewriter from "./Typewriter1";

export default function App() {
  return (
    <>
 
        <div className="column">
          <div className="logo-row">
            <img src={munchLogo} className="logo" alt="" />
            <h1>Munch</h1>
          </div>

          <div className="slogan-column">
            <Typewriter />
            <div className="startButton-center">
              <LocationForm />
            </div>
          </div>
          <Footer />
        </div>

    </>
  );
}
