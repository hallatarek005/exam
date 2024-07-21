/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      keyframes: {
        "zoom-rotate": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(2) rotate(25deg)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(1rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "zoom-rotate": "zoom-rotate 0.5s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out",
        "slide-up-1": "slide-up 0.3s ease-in-out 0.1s",
        "slide-up-2": "slide-up 0.3s ease-in-out 0.2s",
        "slide-up-3": "slide-up 0.3s ease-in-out 0.3s",
        "slide-up-4": "slide-up 0.3s ease-in-out 0.4s",
        slideInTop: "slideInTop 0.5s ease-out",
        slideInLeft: "slideInLeft 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
