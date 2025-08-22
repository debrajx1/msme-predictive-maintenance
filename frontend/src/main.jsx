import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Import App context
import { AppProvider } from "./context/AppContext.jsx";

// Import react-hot-toast
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        {/* Global toaster for notifications */}
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
