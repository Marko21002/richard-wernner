module.exports = {
  content: ["./node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}"],
  presets: [require("@relume_io/relume-tailwind")],
  theme: {
    extend: {
      fontFamily: {
        "geist-sans": "var(--font-geist-sans)",
        "geist-mono": "var(--font-geist-mono)",
        "sofia-sans": "var(--font-sofia-sans)",
        "sofia-sans-condensed": "var(--font-sofia-sans-condensed)",
        "playfair-display": "var(--font-playfair-display)",
        raleway: "var(--font-raleway)",
      },
    },
  },
};
