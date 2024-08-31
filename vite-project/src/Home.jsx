import LocationForm from "./LocationForm";
import Typewriter from "./Typewriter1";
import "./Home.css";
export default function Home() {
  /*
   Section of landing page
   */
  return (
    <section className="home-column" >
      <div className="slogan-column">
        <Typewriter />
        <div className="startButton-center">
          <LocationForm />
        </div>
      </div>
    </section>
  );
}
