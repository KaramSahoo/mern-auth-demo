import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContextProvider";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      console.log(loginData);

      await axios.post("http://localhost:4000/auth/login", loginData);

      await getLoggedIn();
      history("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div class="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div class="max-w-lg mx-auto text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Log in!</h1>
      </div>

      <form onSubmit={login} class="max-w-md mx-auto mt-8 mb-0 space-y-4">
        <div>
          <label for="email" class="sr-only">
            Email
          </label>

          <div class="relative">
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter email"
              value={email}
            />
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">
            Password
          </label>
          <div class="relative">
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              class="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              placeholder="Enter password"
              value={password}
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500">
            No account?
            <span class="underline px-1">
              <Link to="/register">Register</Link>
            </span>
          </p>

          <button
            type="submit"
            class="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
