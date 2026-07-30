import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../app/userSlice";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Unable to connect to the server");
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      console.error(err.message);
      if (err.response) {
        setError(err.response.data.message);
      } else if (err.request) {
        setError("Unable to connect to the server");
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div className="flex justify-center mt-5">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend pt-10 text-center text-xl">
          {isLogin ? "Login" : "Signup"}
        </legend>
        {!isLogin && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">LastName</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-400">{error}</p>}
        <button
          className="btn btn-primary mt-4"
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Signup"}
        </button>
        <p
          className="text-center mt-2 cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "New account? Signup." : "Already have an account? Login."}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
