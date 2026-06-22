import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        paper: "rgb(var(--color-paper) / <alpha-value>)",
        sage: "rgb(var(--color-sage) / <alpha-value>)",
        moss: "rgb(var(--color-moss) / <alpha-value>)",
        blue: "rgb(var(--color-blue) / <alpha-value>)",
        clay: "rgb(var(--color-clay) / <alpha-value>)",
        flax: "rgb(var(--color-flax) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 18px 60px rgb(var(--color-ink) / 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
