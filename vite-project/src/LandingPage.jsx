import { React } from "react";
import "./LandingPage.css";

import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <section id="home">
      <Nav />
      <Home />
      <About />
      <Footer />
    </section>
  );
}
