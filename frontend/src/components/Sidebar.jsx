import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Cpu,
  Upload,
  Settings,
  BarChart3,
  Info,
  Mail,
  Workflow,
} from "lucide-react";

const Item = ({ to, label, Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-emerald-400 text-white shadow-md"
          : "text-slate-300 hover:bg-white/5"
      }`
    }
  >
    <Icon className="h-5 w-5" />
    <span className="text-sm font-medium">{label}</span>
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 border-r border-white/10 bg-[#0f1115] p-4">
      <div className="space-y-6">
        {/* Monitor Section */}
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Monitor
          </div>
          <div className="space-y-1">
            <Item to="/dashboard" label="Dashboard" Icon={LayoutDashboard} />
            <Item to="/predictions" label="Failure Predictions" Icon={Cpu} />
            <Item to="/upload" label="Upload Sensor Data" Icon={Upload} />
          </div>
        </div>

        {/* Analysis Section */}
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Analysis
          </div>
          <div className="space-y-1">
            <Item to="/simulation" label="Simulation" Icon={Workflow} />
            <Item to="/about" label="About System" Icon={Info} />
            <Item to="/contact" label="Contact Support" Icon={Mail} />
          </div>
        </div>

        {/* Future Section (Optional, can remove) */}
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-400 mb-2">
            Reports & Settings
          </div>
          <div className="space-y-1">
            <Item to="/reports" label="Reports" Icon={BarChart3} />
            <Item to="/settings" label="System Settings" Icon={Settings} />
          </div>
        </div>
      </div>
    </aside>
  );
}
