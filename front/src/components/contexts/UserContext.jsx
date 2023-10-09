import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const userContext = createContext(false);
const UserContext = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token") || Cookies.get("token") || null;
    if (!token) {
      return;
    }
    axios
      .post("api/verify", { token })
      .then((res) => {
        const { userId } = res.data.decoded;
        if (!userId) return;
        setLogged(true);
        navigate("/");
      })
      .catch((err) => {
        setLogged(false);
        navigate("/login");
        if (err.response) {
          toast.error(err.response.data);
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  return (
    <userContext.Provider value={{ logged, setLogged }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContext;
