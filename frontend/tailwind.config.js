export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: "#111827",       // main page background
        cardBg: "#1f2937",       // card background
        textPrimary: "#f3f4f6",  // headings / important text
        textSecondary: "#9ca3af" // body / secondary text
      }
    },
  },
  plugins: [],
}
