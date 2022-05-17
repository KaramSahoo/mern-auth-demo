import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContextProvider";

const LogoutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();
  async function logout() {
    await axios.get("http://localhost:4000/auth/logout");
    await getLoggedIn();
    history("/");
  }
  return (
    <button
      className=" hover:bg-blue-400 text-white px-3 py-2 rounded-md text-sm font-medium"
      onClick={logout}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
