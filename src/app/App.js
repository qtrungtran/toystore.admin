import React from "react";
import AppRouter from "./AppRouter";
import "assets/scss/index.scss";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core";
import theme from "theme";
import GlobalStyles from "components/GlobalStyles";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        autoHideDuration={5000}
        maxSnack={5}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <CssBaseline />
        <GlobalStyles />
        <AppRouter />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
