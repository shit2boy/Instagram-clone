import { useState, useEffect, useContext } from "react";
import UserContext from "../context/User";
import { getUserObjByUserId } from "../services/Firebase";

const useUserHook = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      const response = await getUserObjByUserId(user.uid);
      setActiveUser(response);
    };
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);
  return { user: activeUser };
};

export default useUserHook;
