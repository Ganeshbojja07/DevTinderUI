import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../app/requestSlice";

const ConnectionCard = ({
  connection,
  requestId = null,
  cardType = "request",
}) => {
  const { _id, firstName, lastName, age, gender, about, photoUrl, skills } =
    connection;
  const dispatch = useDispatch();
  const handleRequest = async (status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connectionRequest/review/" + status + "/" + requestId,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="card card-side bg-base-300 shadow-sm">
      <figure className="w-48">
        <img
          src={photoUrl}
          alt="user photo"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{about}</p>
        {cardType === "request" && (
          <div className="card-actions justify-end">
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest("rejected")}
            >
              Reject
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("accepted")}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionCard;
