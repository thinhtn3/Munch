import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "../src/LandingPage";

const router = createBrowserRouter([
  {
    path: "/result",
    element: <App />,
  },
  {
    path: "/home",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <LandingPage />, // Default route to home
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
