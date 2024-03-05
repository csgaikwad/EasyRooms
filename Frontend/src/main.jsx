import "./css/index.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";


const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
