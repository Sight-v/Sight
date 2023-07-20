import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import SettingsPage from "./scenes/settingsPage";

import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const bgtheme = useSelector((state) => state.theme);

  const theme = useMemo(() => createTheme(themeSettings(mode, bgtheme)), [ mode, bgtheme ]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/settings/:userId"
              element={isAuth ? <SettingsPage /> : <Navigate to="/" />}
            /> 
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;