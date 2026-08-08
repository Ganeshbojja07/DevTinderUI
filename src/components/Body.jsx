import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../app/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.data));
      // navigate("/");
    } catch (err) {
      console.error(err);
      if (err.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) fetchUser();
  }, [user]);
  return (
    <div className="mb-10">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
