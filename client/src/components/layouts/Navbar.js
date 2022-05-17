import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContextProvider";
import LogoutBtn from "../auth/LogoutBtn";

const Navbar = () => {
  const { loggedIn, email } = useContext(AuthContext);
  return (
    <nav className="bg-blue-500">
      <div className="max-w-full mx-0 px-2 sm:px-6 lg:px-2">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between">
            <div className="hidden sm:block sm:mx-6">
              <div className="flex space-x-4">
                <button className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium">
                  <Link to="/">Home</Link>
                </button>
                {loggedIn === false && (
                  <>
                    <button className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium">
                      <Link to="/register">Register</Link>
                    </button>
                    <button className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium">
                      <Link to="/login">Login</Link>
                    </button>
                  </>
                )}
                {loggedIn === true && (
                  <>
                    <button className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium">
                      <Link to="/customers">Customers</Link>
                    </button>
                    <LogoutBtn />
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:block sm:mx-6">
              <div className="flex space-x-4">
                <p className="text-white px-3 py-2 text-sm font-medium">
                  {email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
