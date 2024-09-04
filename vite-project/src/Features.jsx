import "./Features.css";
import feature1 from "./assets/feature1.jpg";
import feature2 from "./assets/feature2.jpg";
import feature3 from "./assets/feature3.jpg";
// About section

export default function About() {
  return (
    <section id="features">
      <article className="featureContainer">
        <img src={feature2} alt="feature" className="featureImage" />
        {/* <h4 className="about-heading">What is Munch?</h4> */}
        <p className="featureParagraph">
          Find your next favorite restaurant with Munch. Simply enter your
          preferred cuisine and location, and with the help of Yelp, Munch will
          generate a curated list of restaurants to satisfy your munch.
        </p>
      </article>

      <article className="aboutText">
        <img src={feature1} alt="feature" className="featureImage" />
        {/* <h4 className="about-heading">What is Munch?</h4> */}
        <p className="featureParagraph">
          Unsure of what the food/cuisine name is? Upload a photo and Munch will
          help generate a curated list using Google Gemini's photo identifcation
          API.
        </p>
      </article>

      {/* <article className="aboutText">
        <img src={feature3} alt="feature" className="featureImage" />
        <p className="featureParagraph">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
          perferendis temporibus molestias quis odio accusamus, magnam ipsam
          eius sequi nisi corporis voluptates blanditiis exercitationem, nihil
          aliquam rem nobis velit tempore.
        </p>
      </article> */}
    </section>
  );
}
