import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito), sans-serif"],
        syne: ["var(--font-syne), sans-serif"],
        grotesk: ["var(--font-grotesk), sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
