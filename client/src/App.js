import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectDashboardPage from "./pages/ProjectDashboardPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import BlogPage from "./pages/BlogPage";
import NavPage from "./pages/NavPage";

function App() {
  return (
    <Provider store={store()}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/projects" element={<ProjectDashboardPage />} />
          <Route path="/projects/create" element={<CreateProjectPage />} />
          <Route path="/layout" element={<NavPage />} />
          <Route path="/blog" element={<BlogPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
