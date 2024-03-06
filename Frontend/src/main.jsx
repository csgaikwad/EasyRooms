import "./css/index.css";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </>
);
