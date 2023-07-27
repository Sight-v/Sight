import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import SettingsPage from "./scenes/settingsPage";
import ApiPage from "./scenes/apiPage";
import UserApiPage from "./scenes/userApiPage";
import RootPage from "./scenes/rootPage";

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
              path="/root"
              element={<RootPage />}
            />
            <Route
              path="/home"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/settings"
              element={isAuth ? <SettingsPage /> : <Navigate to="/" />}
            /> 
            <Route
              path="/api/:apiId"
              element={isAuth ? <ApiPage /> : <Navigate to="/" />}
            />
            <Route
              path="/apiusers/:apiId"
              element={isAuth ? <UserApiPage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;