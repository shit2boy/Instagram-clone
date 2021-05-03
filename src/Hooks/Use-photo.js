import { useEffect, useState, useContext } from "react";
import UserContext from "../context/User";
import { getUserByUserId, getPhotos } from "../services/Firebase";

export const usePhoto = () => {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos;
      // console.log(following);
      if (following.length) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      //re-arrange array to be nearest photoss first by dateCreated
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    };
    getTimelinePhotos();
  }, [userId]);
  return { photos };
};
