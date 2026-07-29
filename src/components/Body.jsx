import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../app/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view");
      dispatch(addUser(user));
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
