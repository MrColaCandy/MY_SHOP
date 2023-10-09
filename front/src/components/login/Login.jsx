import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const handleOnSubmit = () => {
    toast.info("Sending your data ...");
    axios
      .post("/api/login", { email, password })
      .then((res) => {
        toast.success("Welcome " + res.data.user.name);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data);
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="sm:max-w-md sm:mx-auto sm:w-full">
          <div className="bg-white shadow-md py-8 px-4 sm:rounded-lg sm:px-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleOnSubmit();
              }}
              className=" space-y-5"
            >
              <label
                htmlFor="email"
                className=" block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  value={email}
                  type="email"
                  id="email"
                  autoComplete="email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className=" appearance-none block border-gray-200 w-full px-3 py-4 rounded-md shadow-md placeholder-gray-500 focus:outline-none border-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <label
                htmlFor="email"
                className=" block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  value={password}
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className=" appearance-none block border-gray-200 w-full px-3 py-4 rounded-md shadow-md placeholder-gray-500 focus:outline-none border-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {passwordVisible ? (
                  <AiOutlineEye
                    size={25}
                    className=" absolute top-4 right-4 cursor-pointer"
                    onClick={() => {
                      setPasswordVisible(false);
                    }}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={25}
                    className=" absolute top-4 right-4 cursor-pointer"
                    onClick={() => {
                      setPasswordVisible(true);
                    }}
                  />
                )}
              </div>
              <div className="flex justify-between p-2">
                <div className="flex justify-start gap-3 items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 focus:ring-blue-500 rounded-sm border-gray-300 outline-none focus:border-blue-500"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium text-gray-400"
                  >
                    Remember Me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-sm font-medium text-blue-400">
                    Forget Your Password?
                  </a>
                </div>
              </div>
              <div>
                <button className="bg-blue-600 w-full py-3 rounded-md shadow-sm text-white font-bold hove:shadow-md active:shadow-xl">
                  LOGIN
                </button>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center">
                <div className=" text-gray-400 font-medium text-sm">
                  Don't have an account?
                </div>
                <Link
                  className="text-blue-400 text-sm  font-medium "
                  to={"/register"}
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
