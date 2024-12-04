/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


const SignUp = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  const [data, setData] = useState({ username: "", email: "", password: "" });
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
          "http://localhost:1000/api/v1/sign-in",
          data
        );
        setData({ username: "", email: "", password: "" });
        console.log(responseConn);
        history("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-700 ">
        <div className="text-2xl font-semibold">SignUp</div>
        <input
          type="username"
          placeholder="username"
          className="px-3 py-2 bg-gray-500 my-3 w-full rounded"
          name="username"
          value={data.username}
          onChange={change}
          autoComplete="username"
        />

        <input
          type="email"
          placeholder="email"
          className="px-3 py-2 bg-gray-500 my-3 w-full rounded"
          name="email"
          value={data.email}
          required
          onChange={change}
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="password"
          className="px-3 py-2 bg-gray-500 my-3 w-full rounded"
          name="password"
          value={data.password}
          onChange={change}
          autoComplete="new-password"
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-400 text-xl font-semibold text-black px-3 py-2 rounded-3xl"
            onClick={submit}
          >
            SignUp
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already having an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
