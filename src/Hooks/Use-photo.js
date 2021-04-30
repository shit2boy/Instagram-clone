import { useEffect,useState,useContext } from "react";
import UserContext from '../context/User'
import { getUserByUserId } from "../services/Firebase";



export const usePhoto = ()=>{
    const [photos, setPhotos] = useState(null);

    const {
        user:{uid: userId =''}} = useContext(UserContext)
    }

useEffect(() => {
  const  getTimelinePhotos = async() =>{
      const {following}= await getUserByUserId(userId)
 let followedUserPhoto = [],

 if (following.length >0) {
     followedUserPhoto =await getTimelinePhotos(userId, following)
 }

    }
  getTimelinePhotos();
}, [input])
