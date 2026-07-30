import axios from "axios";
import React from "react";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { removeFeedUser } from "../app/feedSlice";

const UserCard = ({ user, isFeed = false }) => {
  const { photoUrl, firstName, lastName, about, age, gender, skills } = user;
  const dispatch = useDispatch();
  const handleConnection = async (status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connectionRequest/send/" + status + "/" + user._id,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeedUser(user._id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="card bg-base-300 w-60 shadow-sm">
      <figure>
        <img src={photoUrl || null} alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName || ""}
        </h2>
        <p>
          {gender} {age}
        </p>
        <p>{about}</p>
        {isFeed && (
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleConnection("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleConnection("interested")}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
