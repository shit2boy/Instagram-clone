import React, { useEffect } from "react";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = "not found - Instagram";
  }, []);
  return (
    <div className="bg-gray-background">
      <button
        onClick={() => {
          //   console.log(history);
          history.goBack();
        }}
      >
        Please go Back
      </button>
      <div className="mx-auth max-w-screen-lg">
        <p className="text-center text-2xl">Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
