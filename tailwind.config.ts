import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#faf9f6"
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        "soft-glass": "0 18px 45px rgba(15, 23, 42, 0.15)"
      },
      borderRadius: {
        "2.5xl": "1.375rem"
      }
    }
  },
  plugins: []
};

export default config;
