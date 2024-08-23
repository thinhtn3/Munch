export default function About() {
  return (
    <section id="about">
      <h4 style={{fontSize:"3em", textAlign:"left", margin: "1em 0em 0em 0em", padding:"0em 1em"}}>What is Munch?</h4>
      <p style={{fontSize:"1.5em", textAlign:"left", padding:"0em 3em"}}>
        Munch is a web application that creates a curated list of restaurants
        using Yelp's Fusion API to provide contents from local businesses. What
        makes Munch special is the ability to generate a curated list of
        restaurants from a single image.
      </p>
      <h4 style={{fontSize:"3em", textAlign:"left", margin: "1em 0em 0em 0em", padding:"0em 1em"}}>What are we trying to solve?</h4>
      <p style={{fontSize:"1.5em", textAlign:"left", padding:"0em 3em"}}>
        Have you ever seen a delicious dish, but unsure of what the name of the
        dish is called? Munch solves this problem with the help of Google
        Gemini's API. If you are unsure of a dish's name, simply just upload a
        photo, enter your location, and Munch will generate a list of
        restaurants which serves that item or of that similar cuisine.
      </p>
      <h4 style={{fontSize:"3em", textAlign:"left", margin: "1em 0em 0em 0em", padding:"0em 1em"}}>How we came up with the idea?</h4>
      <p style={{fontSize:"1.5em", textAlign:"left", padding:"0em 3em"}}>
        We originally came up with the idea during a LAHacks 2024. Our inital
        goal was to make a consumer web application using an LLM. A problem we
        pointed out in our discussion is how people always post food on social
        media without labelling it. We wanted a way to cut that awkward process
        of asking someone what the food is and worked with that.
      </p>
    </section>
  );
}
