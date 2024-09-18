import LocationForm from "./LocationForm";
import Typewriter from "./Typewriter";
import "./Home.css";
export default function Home() {
  /*
   Section of landing page
   */
  return (
    <div id="backdropPhoto">
      <section className="home-column">
        <div className="slogan-column">
          <Typewriter />
          <div className="startButton-center">
            <LocationForm />
          </div>
        </div>
      </section>
    </div>
  );
}
