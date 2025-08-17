"use client";
const { createTheme } = require("@mui/material");

// const rootRadius100 = {
//   root: {
//     borderRadius: 100,
//     marginBottom: 1,
//   },
// };

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          marginBottom: 20,
        },
      },
    },
  },
  typography: {
    fontFamily: "inherit",
  },
});

export default theme;
