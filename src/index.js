import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./components/LanguageContext";
import { DarkModeProvider } from "./components/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <DarkModeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </DarkModeProvider>
);
