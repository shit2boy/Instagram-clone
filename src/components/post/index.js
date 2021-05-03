import React, { useRef } from "react";
import PropTypes from "prop-types";
import Headers from "./Headers";
import Image from "./Image";
import Actions from "./actions";
import Footer from "./Footer";
import Comments from "./Comments";

export const Post = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  // console.log(content);
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <Headers username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikePhoto}
        handleFocus={handleFocus}
      />

      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        allComments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
};
Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    likes: PropTypes.array.isRequired,
    userLikePhoto: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
