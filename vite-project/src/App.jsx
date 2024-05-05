import { React } from "react";
import photo from "./assets/photo.png";
import "./App.css";
import StartButton from "./StartButton";
import Footer from "./Footer";
import Typewriter from "./Typewriter1";


export default function App() {
  return (
    <>
      <div className="column">
        <div className="logo-row">
          <img src={photo} className="logo" alt="" />
          <h1>SnapCuisine</h1>
        </div>

        <div className="slogan-column">
          <Typewriter />
          <div className="startButton-center">
            <StartButton />

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
