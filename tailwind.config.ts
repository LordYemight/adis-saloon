import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)"],
        sans: ["var(--font-body)"],
      },
      colors: {
        primary: "#1A1A1A",
        secondary: "#FFFFFF",
        accent: "#C0C0C0",
      },
    },
  },
  plugins: [],
};
export default config;