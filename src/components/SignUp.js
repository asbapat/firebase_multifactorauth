import React, { useContext, useState } from "react";
import { firebaseAuth } from "./../provider/AuthProvider";

export default function SignUp() {
  const [view, setView] = useState(true);
  const { handleSignup, handleEnroll, handleVerify, inputs, setInputs } =
    useContext(firebaseAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    await handleSignup();
  };

  const onEnroll = async (e) => {
    setView(false);
    // await handleEnroll();
  };
  const onSubmit = async (e) => {
    await handleEnroll();
  };

  const onVerify = async (e) => {
    await handleVerify();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <h2 align="center">Sign Up</h2>
      <div align="center">
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="email"
            placeholder="email"
            value={inputs.email}
          />
          <input
            onChange={handleChange}
            name="password"
            placeholder="password"
            value={inputs.password}
          />
          <button>signup</button>
        </form>
      </div>
      <br />
      <div align="center">
        <a href="/signin">Already have an account?</a>
      </div>
      <br />
      <div align="center">
        <button onClick={onEnroll}>Enroll 2FA</button>
      </div>
      <br />
      <div hidden={view} align="center">
        <div>
          <input
            onChange={handleChange}
            name="phone"
            placeholder="phone number"
            value={inputs.phone}
          />
          <button onClick={onSubmit}>submit</button>
        </div>
        <br />
        <div>
          <input
            onChange={handleChange}
            name="verifyCode"
            placeholder="verification code"
            value={inputs.verifyCode}
          />
          <button onClick={onVerify}>Verify</button>
        </div>
      </div>
      <div id="2fa-captcha"></div>
    </div>
  );
}
