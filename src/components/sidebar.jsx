import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaHome } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { PiStudentDuotone } from "react-icons/pi";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative  ">
        <button
          className="fixed top-5 left-4 z-50 text-white bg-gray-800 p-2 rounded-md shadow-lg hover:bg-gray-700 transition"
          onClick={toggleSidebar}
        >
          <FaBars size={20} />
        </button>

        <div
          className={`fixed top-25 left-0 h-screen w-64 mt-15 bg-[#212529] p-6 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col space-y-4 mt-16">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition"
            >
              <FaHome className="mr-2 text-xl" />
              <span className="font-semibold">Home</span>
            </Link>

            <Link
              to="/dashboard/register"
              className="flex items-center px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition"
            >
              <FaAddressCard  className="mr-2 text-xl" />
              <span className="font-semibold">Register</span>
            </Link>


            <Link
              to="/dashboard/studentdata"
              className="flex items-center px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition"
            >
             
              <PiStudentDuotone className="mr-2 text-xl"  />
              <span className="font-semibold">Student Record</span>
            </Link>


            <Link
              to="/dashboard/update"
              className="flex items-center px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition"
            >
              <FaUserEdit  className="mr-2 text-xl" />
              <span className="font-semibold">Update</span>
            </Link>

            

          </nav>
        </div>

        {isOpen && <div className="ml-64"></div>}
      </div>
    </>
  );
};

export default Sidebar;
