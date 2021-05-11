import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { getUserByUsername } from "../services/Firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import { UserProfile } from "../components/profile/UserProfile";
const Profile = () => {
  const { username } = useParams();
  const { history } = useHistory();
  const [user, setUser] = useState(null);
  const [userExist, setUserExist] = useState(false);
  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserByUsername(username);
      if (user.length > 0) {
        setUser(user);
        setUserExist(true);
      } else {
        setUserExist(false);
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExists();
    console.log(user);
  }, [username, history]);

  //   console.log(username);
  return userExist ? (
    <div className="bg-gray-background">
      <Header />
      {/* {user.map((item) => ( */}
      <div className="mx-auto max-w-screen-lg">
        {/* {item.fullName} */}
        <UserProfile />
      </div>
      {/* ))} */}
    </div>
  ) : null;
};

export default Profile;
