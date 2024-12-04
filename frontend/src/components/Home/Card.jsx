/* eslint-disable no-unused-vars */
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

const Card = ({home, setInputDiv}) => {
  const data = [
    {
      title: "The task is added",
      desc: "The task is added in the task manager to get remember",
      status: "In Complete",
    },

    {
      title: "The task is deleted",
      desc: "The task is deleted from the task manager if get completed",
      status: "Complete",
    },

    {
      title: "The task is updated",
      desc: "The task is updated in the task manager to get modified",
      status: "In Complete",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data &&
        data.map((item, index) => (
          <div className="flex flex-col justify-between bg-gray-700 rounded-sm p-4" key={index}>
            <div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-300 my-2">{item.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  item.status === "In Complete" ? "bg-red-400" : "bg-green-700"
                } p-2 rounded w-3/6`}
              >
                {item.status}
              </button>
              <div className="text-white p-2 w-3/6 text-2xl flex justify-around">
                <button>
                  <CiHeart />
                </button>
                <button>
                  <FaEdit />
                </button>
                <button>
                  <MdDelete />{" "}
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button className="flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300" onClick = {()=>setInputDiv("fixed")}>
          <IoAddCircle className="text-5xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Card;
