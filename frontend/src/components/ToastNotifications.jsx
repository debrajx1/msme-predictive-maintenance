import { toast } from "react-hot-toast";

const defaultOptions = {
  duration: 4000, // 4 seconds
  position: "top-right",
  style: {
    background: "#1a1c24",
    color: "#f1f5f9",
    fontWeight: 500,
    borderRadius: "0.75rem",
    padding: "12px 16px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  iconTheme: {
    primary: "#fff",
    secondary: "#1a1c24",
  },
};

export const notifySuccess = (msg, options = {}) => toast.success(msg, { ...defaultOptions, ...options });
export const notifyError = (msg, options = {}) => toast.error(msg, { ...defaultOptions, ...options });
export const notifyInfo = (msg, options = {}) => toast(msg, { ...defaultOptions, ...options });
