/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import ImportantTask from "./pages/ImportantTask.jsx";
import AllTask from "./pages/Alltask.jsx";
import CompletedTask from "./pages/CompletedTask.jsx";
import IncompletedTask from "./pages/IncompletedTask.jsx";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth.js";

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login())
    } else if (isLoggedIn === false) {
      navigate("/signup");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="bg-gray-800 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="/ImportantTask" element={<ImportantTask />} />
          <Route path="/CompletedTask" element={<CompletedTask />} />
          <Route path="/IncompletedTask" element={<IncompletedTask />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
