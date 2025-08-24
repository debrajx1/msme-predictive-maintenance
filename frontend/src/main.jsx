import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// App context
import { AuthProvider } from "./context/AuthContext.jsx";

// react-hot-toast
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
