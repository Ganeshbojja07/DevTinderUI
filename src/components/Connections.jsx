import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../app/connectionSlice";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const getConnections = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/users/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!connections) getConnections();
  }, []);

  if (!connections) return null;
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="font-bold text-xl flex text-center">Connections</h1>
      <div className="flex flex-col w-1/2 mt-5 gap-5">
        {connections.map((connection) => (
          <ConnectionCard
            key={connection._id}
            connection={connection}
            cardType="connection"
          />
        ))}
      </div>
    </div>
  );
};

export default Connections;
