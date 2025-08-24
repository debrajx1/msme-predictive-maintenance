import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Predictions from "./pages/Predictions.jsx";
import UploadData from "./pages/UploadData.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Simulation from "./pages/Simulation.jsx";
import Reports from "./pages/Reports.jsx";
import SettingsPage from "./pages/Settings.jsx";

// New pages
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// AppShell layout with Navbar + Sidebar for authenticated users
function AppShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 bg-[#0b0d12]">
          <Outlet /> {/* Render active route */}
        </main>
      </div>
    </div>
  );
}

// Public layout with conditional Navbar
function PublicShell() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/login"]; // Hide Navbar on Landing & Login pages
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className="flex-1 p-6 md:p-12 bg-[#0b0d12]">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route element={<PublicShell />}>
        <Route path="/" element={<Landing />} /> {/* No Navbar */}
        <Route path="/login" element={<Login />} /> {/* No Navbar */}
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Protected App pages */}
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/upload" element={<UploadData />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
