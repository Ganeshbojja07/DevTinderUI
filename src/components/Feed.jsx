import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../app/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/users/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!feed) getFeed();
  }, []);

  if (!feed) return null;
  if (!feed.length)
    return <p className="text-center mt-10">No feed available</p>;

  return (
    <div className="flex justify-center mt-6">
      <UserCard user={feed[0]} isFeed={true} />
    </div>
  );
};

export default Feed;
