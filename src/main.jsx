// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";   // Doit correspondre à export default
import "./index.css";          // Importe les styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />                   {/* Composant principal */}
  </React.StrictMode>
);
