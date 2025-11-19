export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#8BC34A",      // Leaf Green
        // secondary: "#CDDC39",    // Lime
        // accent: "#FFCC80",       // Light Orange
        // background: "#FFFDE7",   // Warm White
        primary: "#FF7043",
        secondary: "#29B6F6",
        accent: "#FFEE58",
        background: "#FAFAFA"

        // primary: "#FFB6C1", // (Soft Pink) OR "#6EC6FF" (Baby Blue)
        // secondary: "#FFE082", // (Soft Yellow)
        // accent: "#A5D6A7", // (Mint Green)
        // background: "#FFF8E1", // (Cream White)

      },
    },
  },
  plugins: [],
}
