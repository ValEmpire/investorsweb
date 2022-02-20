import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store.js";
import { getUser } from "./redux/actions/user.action";
import { setSocket } from "./redux/actions/socket.action";

// Route Guard
import guardedRoute from "./HOCs/guard";
import authRoute from "./HOCs/guard/auth";

// pages
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import UserPage from "./pages/UserPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import ViewProjectPage from "./pages/ViewProjectPage";
import ProjectDashboardPage from "./pages/ProjectDashboardPage";
import ChatMessagePage from "./pages/ChatMessagePage";
import AboutUsPage from "./pages/AboutUsPage";
import InvestmentPage from "./pages/InvestmentPage";
import InvestmentsDashboardPage from "./pages/InvestmentsDashboardPage";
import SingleInvestmentPage from "./pages/SingleInvestmentPage";
import ExplorePage from "./pages/ExplorePage";
import Page404 from "./pages/404Page";
import FavoritePage from "./pages/FavoritePage";

// theme
import { setTheme } from "./theme";

function AppRoutes() {
  const dispatch = useDispatch();

  // guard the pages thats need authentication
  const GuardedUserPage = guardedRoute(UserPage);
  const GuardedProjectDashboardPage = guardedRoute(ProjectDashboardPage);
  const GuardedUpdateProjectPage = guardedRoute(UpdateProjectPage);
  const GuardedInvestmentPage = guardedRoute(InvestmentPage);
  const GuardedInvestmentsDashboardPage = guardedRoute(
    InvestmentsDashboardPage
  );
  const GuardedProjectIdDashboardPage = guardedRoute(ViewProjectPage);
  const GuardedSingleInvestmentPage = guardedRoute(SingleInvestmentPage);
  const GuardedFavoritePage = guardedRoute(FavoritePage);

  // login and register pages does not need to be access by already login user
  const AuthLoginPage = authRoute(LogInPage);
  const AuthRegisterPage = authRoute(RegisterPage);

  const handleSocket = useCallback(() => {
    dispatch(setSocket());

    return;
  }, [dispatch]);

  useEffect(() => {
    handleSocket();
  }, [handleSocket]);

  return (
    <Router>
      <Routes>
        {/* auth route */}
        <Route exact path="/login" element={<AuthLoginPage />} />
        <Route exact path="/register" element={<AuthRegisterPage />} />

        {/* public route */}
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/explore" element={<ExplorePage />} />
        <Route exact path="/chat" element={<ChatMessagePage />} />
        <Route exact path="/aboutus" element={<AboutUsPage />} />
        <Route
          exact
          path="/projects/:projectId"
          element={<ViewProjectPage />}
        />

        {/* secured route */}
        <Route exact path="/user" element={<GuardedUserPage />} />
        <Route
          exact
          path="/projects/dashboard"
          element={<GuardedProjectDashboardPage />}
        />
        <Route
          exact
          path="/projects/dashboard/:projectId"
          element={<GuardedProjectIdDashboardPage />}
        />
        <Route
          exact
          path="/projects/dashboard/:projectId/update"
          element={<GuardedUpdateProjectPage />}
        />
        <Route
          exact
          path="/user/dashboard"
          element={<GuardedInvestmentsDashboardPage />}
        />
        <Route
          exact
          path="/user/dashboard/:investmentId"
          element={<GuardedSingleInvestmentPage />}
        />
        <Route
          exact
          path="/investment/:projectId"
          element={<GuardedInvestmentPage />}
        />
        <Route exact path="/favorites" element={<GuardedFavoritePage />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

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

  return loading ? (
    <></>
  ) : (
    <Provider store={store(user)}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
