import React from "react";
import { useParams } from "react-router";

const Profile = () => {
  const { username } = useParams();
  //   console.log(username);
  return <div>welcome {`${username}`}</div>;
};

export default Profile;
