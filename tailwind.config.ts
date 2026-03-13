import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },
      colors: {
        primary: '#1A1A1A',
        secondary: '#FFFFFF',
        accent: '#C0C0C0',
      }
    },
  },
  plugins: [],
};
export default config;