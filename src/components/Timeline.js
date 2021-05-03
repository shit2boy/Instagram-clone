import React from "react";
import Skeleton from "react-loading-skeleton";
import { usePhoto } from "../Hooks/Use-photo";
import { Post } from "./post";

const Timeline = () => {
  const { photos } = usePhoto();
  // console.log(photos);

  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              className="mr-2 "
              key={index}
              count={1}
              width={300}
              height={300}
            />
          ))}
        </>
      ) : photos?.length ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
