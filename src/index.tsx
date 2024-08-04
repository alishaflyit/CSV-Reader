import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import reportWebVitals from "./reportWebVitals";
import WithFixedCSV from "./pages/WithFixedCSV";
import WithDynamicCSV from "./pages/WithDynamicCSV";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/withFixedCSV" element={<WithFixedCSV />} />
      <Route path="/withDynamicCSV" element={<WithDynamicCSV />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
