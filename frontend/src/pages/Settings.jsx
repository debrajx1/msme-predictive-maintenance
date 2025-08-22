// src/pages/Settings.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [userForm, setUserForm] = useState({ name: "", role: "" });
  const [notificationForm, setNotificationForm] = useState({ emailAlerts: true });
  const [preferenceForm, setPreferenceForm] = useState({ theme: "dark", language: "English" });
  const [toast, setToast] = useState(null);
  const [users, setUsers] = useState([]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleUserSubmit = () => {
    if (!userForm.name || !userForm.role) return showToast("Please fill all fields");
    setUsers([...users, userForm]);
    showToast(`User ${userForm.name} added with role ${userForm.role}`);
    setUserForm({ name: "", role: "" });
  };

  const handleNotificationSubmit = () => {
    showToast(`Notifications updated: Email Alerts ${notificationForm.emailAlerts ? "ON" : "OFF"}`);
  };

  const handlePreferenceSubmit = () => {
    showToast(`Preferences updated: Theme ${preferenceForm.theme}, Language ${preferenceForm.language}`);
  };

  const settingsCards = [
    {
      title: "User Management",
      description: "Add, remove, or update user accounts and roles.",
      content: (
        <div className="space-y-3">
          <p>Here you can create new users and assign roles.</p>
          <input
            type="text"
            placeholder="User Name"
            value={userForm.name}
            onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
            className="w-full p-2 rounded bg-[#2a2c34] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={userForm.role}
            onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            className="w-full p-2 rounded bg-[#2a2c34] text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Operator">Operator</option>
            <option value="Viewer">Viewer</option>
          </select>
          <button
            onClick={handleUserSubmit}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition"
          >
            Add User
          </button>

          {users.length > 0 && (
            <div className="mt-4 text-sm text-slate-300">
              <h3 className="font-semibold mb-1">Existing Users:</h3>
              <ul className="list-disc list-inside">
                {users.map((u, idx) => (
                  <li key={idx}>{u.name} ({u.role})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Notification Settings",
      description: "Configure alerts, emails, and system notifications.",
      content: (
        <div className="space-y-3">
          <p>Enable or disable email alerts for system events.</p>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notificationForm.emailAlerts}
              onChange={(e) => setNotificationForm({ emailAlerts: e.target.checked })}
            />
            <span>Email Alerts</span>
          </label>
          <button
            onClick={handleNotificationSubmit}
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
          >
            Save Settings
          </button>
        </div>
      ),
    },
    {
      title: "System Preferences",
      description: "Adjust global preferences such as theme, language, and time zone.",
      content: (
        <div className="space-y-3">
          <p>Set your preferred theme and language.</p>
          <select
            value={preferenceForm.theme}
            onChange={(e) => setPreferenceForm({ ...preferenceForm, theme: e.target.value })}
            className="w-full p-2 rounded bg-[#2a2c34] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
          <select
            value={preferenceForm.language}
            onChange={(e) => setPreferenceForm({ ...preferenceForm, language: e.target.value })}
            className="w-full p-2 rounded bg-[#2a2c34] text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="English">English</option>
            <option value="Odia">Odia</option>
          </select>
          <button
            onClick={handlePreferenceSubmit}
            className="px-4 py-2 bg-purple-500 rounded hover:bg-purple-600 transition"
          >
            Save Preferences
          </button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      className="p-6 mx-auto max-w-3xl space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-white">System Settings</h1>
      <p className="text-slate-400">
        Manage application settings, user permissions, and configuration options.
      </p>

      <div className="space-y-4 mt-6">
        {settingsCards.map((card) => (
          <motion.div
            key={card.title}
            className="card p-5 bg-[#1a1c24] rounded-xl shadow-md text-white hover:scale-105 transition-transform duration-300 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveModal(card.title)}
          >
            <h2 className="font-semibold mb-2">{card.title}</h2>
            <p className="text-slate-300 text-sm">{card.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setActiveModal(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-[#1a1c24] p-6 rounded-xl max-w-md w-full shadow-lg text-white"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{activeModal}</h2>
                <button
                  onClick={() => setActiveModal(null)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                {settingsCards.find((c) => c.title === activeModal)?.content}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-6 right-6 bg-white text-black px-4 py-2 rounded shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
