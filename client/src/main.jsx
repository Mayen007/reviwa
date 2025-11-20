import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { SocketProvider } from "./context/SocketContext.jsx";

// Configure axios base URL from environment variable (set VITE_API_URL on Netlify)
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationProvider>
      <SocketProvider>
        <App />
        <ToastContainer />
      </SocketProvider>
    </NotificationProvider>
  </React.StrictMode>
);
