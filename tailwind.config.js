/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        md: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        lg: "3px 3px 6px rgba(0, 0, 0, 0.2)",
        xl: "4px 4px 8px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "fade-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(2rem)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
      },
      animation: {
        "fade-left": "fade-left 0.5s ease-out",
      },
    },
    fontFamily: {
      heading: ['"Work Sans"', "sans-serif"], // For headings
      body: ["Merriweather", "serif"], // For content
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-sm": {
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
        ".text-shadow-md": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        },
        ".text-shadow-lg": {
          textShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
        },
        ".text-shadow-xl": {
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
