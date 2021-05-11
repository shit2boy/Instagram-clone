import React, { useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import {
  getUserByUsername,
  getUserPhotoByUsername,
} from "../../services/Firebase";
import Header from "../Header";

const Profile = () => {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0,
  };
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const [user] = await getUserByUsername(username);
      const photos = getUserPhotoByUsername(username);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    getProfileInfoAndPhotos();
  }, [username]);
  return (
    <>
      <Header />
    </>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Profile;
