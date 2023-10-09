import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import ActivationPage from "./pages/ActivationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import UserContext from "./components/contexts/UserContext";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;
const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <UserContext>
          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterPage />} path="/register" />
            <Route element={<ActivationPage />} path="/activation" />
          </Routes>
        </UserContext>
      </BrowserRouter>
    </>
  );
};

export default App;
