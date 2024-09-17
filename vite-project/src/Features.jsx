import "./Features.css";
import feature1 from "./assets/feature1.svg";
import feature2 from "./assets/feature2.svg";
import feature3 from "./assets/feature3.svg";
// About section

export default function About() {
  return (
    <section id="features">
      <article className="featureContainer">
        <img src={feature2} alt="feature" className="featureImage" />
        {/* <h4 className="about-heading">What is Munch?</h4> */}
        <p className="featureParagraph">
          Find your next favorite restaurant with Munch. Curated directly from
          Yelp.
        </p>
      </article>

      <article className="featureContainer">
        <img src={feature1} alt="feature" className="featureImage" />
        {/* <h4 className="about-heading">What is Munch?</h4> */}
        <p className="featureParagraph">
          Unsure of what the food/cuisine name is? Upload a photo and let Munch
          find your next meal!
        </p>
      </article>

      <article className="featureContainer">
        <img src={feature3} alt="feature" className="featureImage" />
        <p className="featureParagraph">
          Take Munch everywhere you go with our mobile-friendly design.
        </p>
      </article>
    </section>
  );
}
