import React from "react";
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import { MdNotificationsActive } from "react-icons/md";
import Swal from "sweetalert2";

const Header = () => {
  const { userLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate("/");
      Swal.fire("Signed out!", "You have been signed out.", "success");
    } catch (error) {
      Swal.fire("Oops...", error.message, "error");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gray-800 p-4 flex justify-between items-center shadow-md flex-wrap sm:gap-3">
      <h3 className=" font-bold pl-20 text-white uppercase text-sm overflow-hidden  ">
        Admin Dashboard
      </h3>

      <div className="flex items-center gap-4 pr-10">
        <div className="flex flex-col text-right sm-block">
          <h6 className="text-white font-semibold text-sm">
            {userLoggedIn
              ? ` ${currentUser?.displayName || "User"}`
              : "Welcome Guest"}
          </h6>
          <span className="text-gray-300 text-xs">
            {currentUser?.email || ""}
          </span>
        </div>

        <div className="hidden sm:block">
          <MdNotificationsActive size={26} className="text-white" />
        </div>

        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <img
            src={currentUser?.photoURL || "https://via.placeholder.com/40"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {userLoggedIn && (
          <button
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded transition"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
