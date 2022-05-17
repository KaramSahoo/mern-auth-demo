import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [email, setEmail] = useState("");
  const [userID, setUserID] = useState("");

  async function getLoggedIn() {
    const loggedInResponse = await axios.get(
      "http://localhost:4000/auth/loggedIn/"
    );
    setLoggedIn(loggedInResponse.data.status);
    setEmail(loggedInResponse.data.email);
    setUserID(loggedInResponse.data.userID);
  }

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, email, userID }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
