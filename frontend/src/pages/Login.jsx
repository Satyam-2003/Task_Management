/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {authActions} from '../store/auth'

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const dispatch = useDispatch()
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    try {
      if (data.username === "" || data.email === "" || data.password === "") {
        alert("All fields are required");
      } else {
        const responseConn = await axios.post(
          "http://localhost:1000/api/v1/log-in",
          data
        );
        setData({ username: "", password: "" });
        localStorage.setItem("id", responseConn.data.id);
        localStorage.setItem("token", responseConn.data.token);
        dispatch(authActions.login())
        history("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-700 ">
        <div className="text-2xl font-semibold">LogIn</div>
        <input
          type="username"
          placeholder="username"
          className="px-3 py-2 bg-gray-500 my-3 w-full rounded"
          name="username"
          value={data.username}
          onChange={change}
        />

        <input
          type="password"
          placeholder="password"
          className="px-3 py-2 bg-gray-500 my-3 w-full rounded"
          name="password"
          value={data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded-3xl"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Not having an account? SignUp here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
