import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
    colors: {
    primary: {
      100: "#E5FCF1",
      200: "#27EF96",
      300: "#10DE82",
      400: "#0EBE6F",
      500: "#0CA25F",
      600: "#0A864F",
      700: "#086F42",
      800: "#075C37",
      900: "#064C2E"
    },
    main: {
      50: "#fffff0",
      100: "#fefcbf",
      200: "#faf089",
      300: "#f6e05e",
      400: "#ecc94b",
      500: "#d69e2e",
      600: "#b7791f",
      700: "#975a16",
      800: "#744210",
      900: "#5F370E",
    },
    secondary: {
      background: "#FBF7EF",
      link: "#4A5568",
      card: "#ffffff",
      inputHelper: "#CBD5E0",
    },
    navItem: {
      50: "#F7FAFC",
      100: "#EDF2F7",
      400: "#A0AEC0",
      500: "#718096",
      600: "#4A5568",
    },
  },
});


export default customTheme;