import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../app/userSlice";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const genderCategories = [
  { displayName: "Male", value: "male" },
  { displayName: "Female", value: "female" },
  { displayName: "Other", value: "other" },
];

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [skills, setSkills] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          // skills,
          about,
          gender,
          age,
          photoUrl,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
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

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      setSkills(user.skills || "");
    }
  }, [user]);

  if (!user) return null;
  return (
    <>
      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center ">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend pt-10">Your Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="label">Age</label>
            <input
              type="text"
              className="input"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="label">Gender</label>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn m-1">
                {gender}
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {genderCategories.map((item, index) => (
                  <li
                    key={index + "gender"}
                    onClick={() => setGender(item.value)}
                  >
                    <a>{item.displayName}</a>
                  </li>
                ))}
              </ul>
            </div>
            <label className="label">About</label>
            <textarea
              className="textarea"
              placeholder="About"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>

            <label className="label">Photo Url</label>
            <input
              type="text"
              className="input"
              placeholder="Photo Url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="label">Skills</label>
            <input
              type="text"
              className="input"
              placeholder="Skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            {error && <p className="text-red-400">{error}</p>}
            <button
              className="btn btn-primary mt-4"
              onClick={handleSaveProfile}
            >
              Save Profile
            </button>
          </fieldset>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, skills, about, gender }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center mt-10">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
