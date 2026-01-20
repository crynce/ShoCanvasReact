/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bitcount: '"Bitcount Grid Double", system-ui',
      },
      letterSpacing: {
        tight: "2px",
      },
      animation: {
        "rotate-pixels": "rotate-pixels 2s infinite",
        hzero: "hzero 1s normal infinite",
        "cover-retract":
          "coverAndRetract 2s cubic-bezier(0.19, 1.13, 0.84, 0.97) forwards",
      },
      keyframes: {
        "rotate-pixels": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(180deg)" },
          "75%": { transform: "rotate(270deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        hzero: {
          "0%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
          "100%": { transform: "translateY(0)" },
        },
        coverAndRetract: {
          "0%": { width: "80%", left: "10%" },
          "50%": { width: "100%", left: "0" },
          "100%": { width: "80%", left: "10%" },
        },
      },
      colors: {
        "glass-light": "rgba(255, 255, 255, 0.05)",
        "glass-hover": "rgba(255, 255, 255, 1)",
      },
      backdropFilter: {
        "blur-sm": "blur(3px)",
        "blur-md": "blur(4px)",
      },
    },
  },
  plugins: [],
};
