import { firebase, FieldValue } from "../llib/firebase";

export const doesUsernameExist = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();
  return result.docs.map((user) => user.data().length > 0);
};

//
export const getUserByUsername = async (username) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

//get user from the firestore where userId === userid (passed from the auth0)
export const getUserByUserId = async (userId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({ ...item.data(), docId: item.id }));
  return user;
};

export const getSuggestedProfiles = async (userId, following) => {
  let query = firebase.firestore().collection("users");

  if (following.length > 0) {
    query = query.where("userId", "not-in", [...following, userId]);
  } else {
    query = query.where("userId", "!=", userId);
  }
  const result = await query.limit(10).get();

  const profiles = result.docs.map((user) => ({
    ...user.data(),
    docId: user.id,
  }));

  return profiles;

  // const result = await firebase.firestore().collection("users").limit(10).get();
  // return result.docs
  //   .map((user) => ({ ...user.data(), docId: user.Id }))
  //   .filter(
  //     (profile) =>
  //       profile.userId === userId && !following.includes(profile.userId)
  //   );
};

export const updateLoggedInUserFollowing = (
  loggedInUserId,
  profileId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
};

export const updateFollowedUserFollowers = (
  profileDocId,
  loggedInUserId,
  isFollowingProfile
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    });
};

export const getPhotos = async (userId, following) => {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();
  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikePhoto = false;
      if (photo.likes.includes(userId)) {
        userLikePhoto = true;
      }
      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];
      return { username, ...photo, userLikePhoto };
    })
  );
  return photoWithUserDetails;
};

export async function getUserPhotoByUsername(username) {}
