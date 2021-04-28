import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import firebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  // const onChangeHandler = () => {};
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = "login - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/Images/iphone-with-profile.jpg" alt="akeem" />
      </div>
      <div className="flex flex-col w-2/5 ml-5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src="/Images/logo.png"
              alt="instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={loginHandler}>
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
              Log in
            </button>
          </form>
          <div className="flex justify-center items-center flex-col w-full bg-white my-3 p-4 border border-gray-primary">
            <p className="text-sm ">
              Don't have an account?{" "}
              <Link to={ROUTES.SIGN_IN} className="font-bold text-blue-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
