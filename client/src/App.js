import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider store={createStore(store)}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
