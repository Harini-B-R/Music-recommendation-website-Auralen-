// import "@fontsource/inter/400.css";
// import "@fontsource/inter/600.css";
// import "@fontsource/inter/700.css";

// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import App from './App.jsx'
// import './styles.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// )
// src/main.jsx
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./MainApp";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
