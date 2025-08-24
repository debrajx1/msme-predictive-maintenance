/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/daisyui/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mylight: {
          "primary": "#1D4ED8",        // buttons, highlights
          "secondary": "#10B981",      // success/accent
          "accent": "#F59E0B",         // warnings
          "neutral": "#F3F4F6",        // backgrounds
          "base-100": "#FFFFFF",       // cards, containers
          "base-200": "#F9FAFB",       // page background
          "base-300": "#E5E7EB",       // subtle sections
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
          "text": "#111827",           // main text
        },
      },
      {
        mydark: {
          "primary": "#3B82F6",
          "secondary": "#10B981",
          "accent": "#F59E0B",
          "neutral": "#111827",
          "base-100": "#1F2937",       // card bg
          "base-200": "#111827",       // page bg
          "base-300": "#1E293B",       // sections
          "info": "#60A5FA",
          "success": "#34D399",
          "warning": "#FBBF24",
          "error": "#F87171",
          "text": "#F3F4F6",           // main text
        },
      },
    ],
    darkTheme: "mydark",
  },
};
