import { React } from "react";
import "./App.css";

import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";

export default function App() {
  return (
    <section id="home">
      <Nav />
      <Home />
      <About />
      <Footer />
    </section>
  );
}
