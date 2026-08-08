import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionCard from "./ConnectionCard";
import { addRequests } from "../app/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequests = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/users/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!requests) getRequests();
  }, []);

  if (!requests) return null;
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="font-bold text-xl flex text-center">
        Connection Requests
      </h1>
      <div className="flex flex-col w-1/2 mt-5 gap-5">
        {requests.map((connection) => (
          <ConnectionCard
            key={connection._id}
            requestId={connection._id}
            connection={connection.fromUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Requests;
