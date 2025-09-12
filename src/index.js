// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <UserProvider>
        <AuthProvider>
           <App />
        </AuthProvider>
      </UserProvider>
  </BrowserRouter>
);

reportWebVitals();


/*NOTE:
there are two home tab but on reviver side navigationg from profile to back on home will navigate us to donor home page.
decide how to schedule pickup in realtime. and how to assigne date
*/
