import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      neutral: {
        100: "#F8FAFC",
        200: "#E3E8EF",
        300: "#c1c5c7",
        400: "#97A3B6",
        900: "#040616",
      },
      info: {
        700: "#3662E3",
      },
      success: {
        200: "#A0ECB1",
        700: "#32D657",
      },
      warning: {
        200: "#F5E8D5",
        300: "#F5D565",
        700: "#E9A23B",
      },
      danger: {
        200: "#F7D4D3",
        700: "#DD524C",
      },
    },
  },
  plugins: [],
};
export default config;
