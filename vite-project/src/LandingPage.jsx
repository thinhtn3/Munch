import { React } from "react";
import "./LandingPage.css";
import munchOrangeHeader from "./assets/munchOrangeHeader.png";

import Nav from "./Nav";
import Home from "./Home";
import Features from "./Features";
import Footer from "./Footer";
import About from "./About";
import ContactForm from "./ContactForm";

export default function LandingPage() {
  return (
    <section id="landingPage">
      <Nav />
      <Home />
      <Features />
      <About />
      <ContactForm />
      <Footer />

      <img
        src={munchOrangeHeader}
        alt="Munch Header"
        style={{ width: "100vw" }}
      />
    </section>
  );
}
