/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = [
    {
      title: "All Task",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important Task",
      icon: <MdLabelImportant />,
      link: "/ImportantTask",
    },
    {
      title: "Completed Task",
      icon: <FaCheckDouble />,
      link: "/CompletedTask",
    },
    {
      title: "Incomplete Task",
      icon: <TbNotebookOff />,
      link: "/IncompletedTask",
    },
  ];
  const [Data, setData] = useState();
  const logout = () => {
    localStorage.clear(); // Clear all local storage
    dispatch(authActions.logout());
    navigate("/signin");
  };

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
  }, []); // Dependency array to avoid infinite loop

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}

      <div>
        {data.map((item, index) => (
          <Link
            to={item.link}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
            key={index}
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </Link>
        ))}
      </div>

      <div>
        <button className="bg-gray-600 p-2 rounded w-full" onClick={logout}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Sidebar;
