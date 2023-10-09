import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Activation = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/api/token/" + token)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Account activated!");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      });
  }, []);
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className=" p-10 rounded-lg flex flex-col gap-8 justify-center items-center text-center bg-blue-400 text-white font-medium">
          Your account has been activated!
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-blue-600 hover:shadow-lg active:shadow-sm py-2 px-3 rounded-md text-white font-bold"
          >
            HOME
          </button>
        </div>
      </div>
    </>
  );
};

export default Activation;
