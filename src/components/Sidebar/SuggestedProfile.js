import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/Firebase";

const SuggestedProfile = ({
  userId,
  profileDocId,
  username,
  profileId,
  loggedInUserId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
    // const [user] = await getUserByUserId(userId);
    // setActiveUser(user);
  };

  return !followed ? (
    <div className="flex flex-row items-center align=items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          //   src={`/images/avatars/${username}.png`}
          src={`/images/users/avi/akeem.jpg`}
          alt="suggested-profile"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <div className="">
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={handleFollowUser}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  userId: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
};
export default SuggestedProfile;
