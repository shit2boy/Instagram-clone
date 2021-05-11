import React, { useState } from "react";
import PropTypes from "prop-types";

import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";

const Comments = ({ docId, posted, allComments, commentInput }) => {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments >= 2 && (
          <p className="tex-sm text-gray-base mb-1 cursor-pointer">
            View all comments
          </p>
        )}

        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        comments={comments}
        docId={docId}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
};

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};

export default Comments;
