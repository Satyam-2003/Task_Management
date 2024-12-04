/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Card from "../components/Home/Card";
import { IoAddCircle } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import axios from "axios";
import { useEffect } from "react";

const AllTask = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const headers = {};
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  if (id && token) {
    headers.id = id;
    headers.authorization = `Bearer ${token}`;
  }
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v2/get-all-task",
          {
            headers,
          }
        );
        setData(response.data.Data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircle className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
     <Card home={"true"} setInputDiv = {setInputDiv} />
      </div>
      <InputData inputDiv={inputDiv} setInputDiv = {setInputDiv} />
    </>
  );
};

export default AllTask;
