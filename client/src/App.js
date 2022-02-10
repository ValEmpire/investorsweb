import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { getUser } from "./redux/actions/user.action";

// Route Guard
import guardedRoute from "./HOCs/guard";
import authRoute from "./HOCs/guard/auth";

// pages
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ViewProjectPage from "./pages/ViewProjectPage";
import ProjectDashboardPage from "./pages/ProjectDashboardPage";
import AboutUsPage from "./pages/AboutUsPage";
import InvestmentPage from "./pages/InvestmentPage";

// theme
import { setTheme } from "./theme";
import ExplorePage from "./pages/ExplorePage";

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  // handles the call to the server to get the userdetails
  // if error happens navigate to /login
  const handleUser = async () => {
    try {
      setLoading(true);

      const res = await getUser();

      setUser({ user: res });

      setLoading(false);
    } catch (err) {
      window.location.replace("/login");
    }
  };

  // getUserDetails when component did mount
  useEffect(() => {
    handleUser();
    setTheme();
  }, []);

  // guard the pages thats need authentication
  const GuardedUserPage = guardedRoute(UserPage);
  const GuardedProjectDashboardPage = guardedRoute(ProjectDashboardPage);
  const GuardedCreateProjectPage = guardedRoute(CreateProjectPage);
  const GuardedViewProjectPage = guardedRoute(ViewProjectPage);
  const GuardedInvestmentPage = guardedRoute(InvestmentPage);

  // login and register pages does not need to be access by already login user
  const AuthLoginPage = authRoute(LogInPage);
  const AuthRegisterPage = authRoute(RegisterPage);

  return loading ? (
    <></>
  ) : (
    <Provider store={store(user)}>
      <Router>
        <Routes>
          {/* auth route */}
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />

          {/* public route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />


          {/* secured route */}
          <Route path="/user" element={<GuardedUserPage />} />
          <Route path="/projects" element={<GuardedProjectDashboardPage />} />
          <Route
            path="/projects/create"
            element={<GuardedCreateProjectPage />}
          />
          <Route
            path="/projects/:projectId"
            element={<GuardedViewProjectPage />}
          />
          <Route
            path="/investment/:projectId"
            element={<GuardedInvestmentPage />}
          />
        </Routes>
        
        
      </Router>
    </Provider>
  );
}

export default App;
