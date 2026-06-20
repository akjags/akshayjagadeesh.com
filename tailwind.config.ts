import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#18201d",
        mist: "#f7f8f4",
        paper: "#fffdf7",
        sage: "#71856f",
        moss: "#4f674e",
        blue: "#496a80",
        clay: "#b98a68",
        flax: "#e7dcc6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgba(24, 32, 29, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
