// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";             // importe les styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />                      // votre composant principal
  </React.StrictMode>
);
