import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/Firebase";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  // const onChangeHandler = () => {};
  const signupHandler = async (e) => {
    e.preventDefault();
    const usernameExist = await doesUsernameExist(username);

    if (!usernameExist.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        //authentication
        await createdUserResult.user.updateProfile({
          displayName: username,
        });
        //firebase user collection (create a document)
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            email: email.toLowerCase(),
            following: ["aTKxK14ggQM4jWaVH63G3B0ldyC3"],
            dateCreated: Date.now(),
          });
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setEmail("");
        setUsername("");
        setPassword("");
        setFullname("");
        setError(error.message);
      }
    } else {
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/Images/iphone-with-profile.jpg" alt="akeem" />
      </div>
      <div className="flex flex-col w-2/5 ml-5">
        <div classname="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/Images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={signupHandler}>
            <input
              type="text"
              placeholder="username"
              aria-label="Enter your username"
              className="text-sm text-gray-base w-full mr-3 px-4 py-5 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
              value={username}
            />
            <input
              type="text"
              placeholder="Full name"
              aria-label="Enter your Fullname"
              className="text-sm text-gray-base w-full mr-3 px-4 py-5 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setFullname(target.value);
              }}
              value={fullName}
            />
            <input
              type="text"
              placeholder="Email address"
              aria-label="Enter your email address"
              className="text-sm text-gray-base w-full mr-3 px-4 py-5 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setEmail(target.value);
              }}
              value={email}
            />
            <input
              type="password"
              placeholder="Password"
              aria-label="Enter your password"
              className="text-sm text-gray-base w-full mr-3 px-4 py-5 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium mr-3 p-3 w-full rounded text-white ${
                isInvalid && `opacity-50`
              }`}
            >
              Sign Up
            </button>
          </form>
          <div className="flex justify-center items-center flex-col w-full bg-white my-3 p-4 border border-gray-primary">
            <p className="text-sm ">
              Don't have an account?{" "}
              <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
