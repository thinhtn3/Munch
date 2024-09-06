import LocationForm from "./LocationForm";
import Typewriter from "./Typewriter1";
import "./Home.css";
import coverPhoto from "./assets/amirali-mirhashemian-fimM6mgqv6M-unsplash.jpg";
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
