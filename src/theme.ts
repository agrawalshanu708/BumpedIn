import { extendTheme } from "native-base";

export const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#6558F5",
        100: "#e0defd",
        400: "#6558F5",
        500: "#6558F5",
        600: "#6558F5",
        700: "#6558F5",
        800: "#6558F5",
        900: "#6558F5",
      },
      // Redefining only one shade, rest of the color will remain same.
      amber: {
        400: "#d97706",
      },
      config: {
        // Changing initialColorMode to 'dark'
        initialColorMode: "dark",
      },
  
    },
    fonts: {
      heading: "Assistant-Regular",
      body: "Assistant-Regular",
      mono: "Assistant-Regular",
    },
  });