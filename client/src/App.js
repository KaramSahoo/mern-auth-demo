import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Register from "./components/auth/Register";
import Navbar from "./components/layouts/Navbar";
import axios from "axios";
import Login from "./components/auth/Login";
import AuthContext from "./context/AuthContextProvider";
import NotFound from "./components/layouts/NotFound";
import Customers from "./components/customers/Customers";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<h1>Hello</h1>} />
        {loggedIn === false && (
          <>
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
          </>
        )}
        {loggedIn === true && (
          <>
            <Route path="/customers" exact element={<Customers />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
