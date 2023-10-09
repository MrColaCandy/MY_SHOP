import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleOnSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", file);
    toast.info("Sending Your Data ...");
    axios
      .post("/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.success("Now check your email and activate your account ...🙂 ");
        setEmail(null);
        setPassword(null);
        setName(null);
        setFile(null);
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
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
                htmlFor="name"
                className=" block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  value={name}
                  type="name"
                  id="name"
                  autoComplete="name"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className=" appearance-none block border-gray-200 w-full px-3 py-4 rounded-md shadow-md placeholder-gray-500 focus:outline-none border-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
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
                <label
                  className="flex justify-start gap-3 items-center"
                  htmlFor="avatar"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    id="avatar"
                    hidden
                  />
                  {file ? (
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={URL.createObjectURL(file)}
                      alt="avatar"
                    />
                  ) : (
                    <RxAvatar color="rgb(147,197,253)" size={50} />
                  )}
                  <div className="bg-blue-300 text-sm font-medium text-white hover:shadow-lg active:shadow-sm rounded-md py-3 px-4">
                    UPLOAD
                  </div>
                </label>
              </div>
              <div>
                <button className="bg-blue-600 w-full py-3 rounded-md  text-white font-bold hover:shadow-xl active:shadow-sm">
                  REGISTER
                </button>
              </div>
              <div className="flex flex-col gap-3 justify-center items-center">
                <div className=" text-gray-400 font-medium text-sm">
                  Already have an account?
                </div>
                <Link
                  className="text-blue-400 text-sm  font-medium "
                  to={"/login"}
                >
                  Login
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
