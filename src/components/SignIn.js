// add useContext
import React, { useContext } from "react";
import { firebaseAuth } from "../provider/AuthProvider";

const SignIn = () => {
  const { handleSignin, handleSignInVerify, inputs, setInputs, errors } =
    useContext(firebaseAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    handleSignin();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const onVerify = async () => {
    await handleSignInVerify();
  };

  return (
    <div>
      <h2 align="center">Multifactor Authentication Demo</h2>
      <form onSubmit={handleSubmit} align="center">
        {/* replace the div tags with a form tag */}

        {/* make inputs  */}
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
        <button>login</button>
        {errors.length > 0
          ? errors.map((error) => <p style={{ color: "red" }}>{error}</p>)
          : null}
      </form>
      <br />
      <div align="center">
        <input
          onChange={handleChange}
          name="code"
          placeholder="verification code"
          value={inputs.code}
        />
        <button onClick={onVerify}>Verify</button>
      </div>
      <br />
      <div align="center">
        <a href="/signup">Don't have an account?</a>
      </div>
      <div id="2fa-captcha"></div>
    </div>
  );
};

export default SignIn;
