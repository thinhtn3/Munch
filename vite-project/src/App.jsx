import { React } from "react";
import "./App.css";

import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Footer from "./Footer";

export default function App() {
  return (
    <>
      <Nav />
      <Home />
      <About />
      <Footer />
    </>
  );
}
