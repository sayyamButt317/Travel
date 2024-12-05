import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import OnBoarding from "./pages/OnBoarding";

const Home = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<OnBoarding />} />
        <Route path="/sign-up" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Home;
