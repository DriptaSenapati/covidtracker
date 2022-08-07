import React, { Suspense } from 'react';
import Navbar from "./components/Navbar";
// import { createGlobalStyle, ThemeProvider } from "styled-components"
import { ThemeProvider } from "@material-ui/styles";
// import Home from "./components/Home";
import { createTheme } from '@material-ui/core/styles';
//import indiaData from "./data/india_state.json";
import { DarkThemeHandler } from "./Themes/DarkThemeHandler";
import { Paper } from "@material-ui/core";
import GlobalStyle from './components/globalStyles';


const Home = React.lazy(() => import("./components/Home.js"));



function App() {
  const [theme, setThemeHandler] = DarkThemeHandler();


  const themeCallback = (theme) => {
    setThemeHandler(theme);
  };

  const MuiTheme = createTheme({
    palette: {
      type: theme.mode === "light" ? "light" : "dark",
      background: {
        paper: theme.mode === "light" ? "white" : "#141431",
      }
    }
  })

  return (
    <>
      <ThemeProvider theme={MuiTheme}>
        <Paper style={{ minHeight: "100vh" }}>
          <GlobalStyle theme={theme.mode}/>
          <Navbar callback={themeCallback} />
          <Suspense fallback={<div/>}>
            <Home />
          </Suspense>

        </Paper>


      </ThemeProvider>


    </>
  );
}

export default App;
