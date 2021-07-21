import React, { useState } from "react";
import { authMethods } from "../firebase/authmethods";

export const firebaseAuth = React.createContext(null);
export default function AuthProvider(props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    phone: "",
    verifyCode: "",
    code: "",
  });
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState(null);

  const handleEnroll = () => {
    console.log("handleEnroll");
    authMethods.enroll(inputs.phone);
  };

  const handleVerify = () => {
    console.log("handleEnroll");
    authMethods.verify(inputs.verifyCode);
  };

  const handleSignup = () => {
    // middle man between firebase and signup
    console.log("handleSignup");
    // calling signup from firebase server
    authMethods.signup(inputs.email, inputs.password, setErrors, setToken);
    console.log(errors);
  };

  const handleSignin = () => {
    //changed to handleSingin
    console.log("handleSignin!!!!");
    // made signup signin
    authMethods.signin(inputs.email, inputs.password, setErrors);
    console.log(errors, token);
  };

  const handleSignout = () => {
    authMethods.signout(setErrors, setToken);
  };

  const handleSignInVerify = () => {
    authMethods.verifyLogin(inputs.code, setToken);
  };

  return (
    <firebaseAuth.Provider
      value={{
        handleSignup,
        handleSignin,
        handleSignInVerify,
        handleEnroll,
        handleVerify,
        token,
        inputs,
        setInputs,
        errors,
        handleSignout,
      }}
    >
      {props.children}
    </firebaseAuth.Provider>
  );
}
