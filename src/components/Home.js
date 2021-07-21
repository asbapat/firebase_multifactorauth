import React, { useContext } from "react";
import { firebaseAuth } from "../provider/AuthProvider";

const Home = (props) => {
  const { handleSignout } = useContext(firebaseAuth);
  return (
    <div>
      <h1 align="center">Home</h1>
      <h2 align="center">login successful!!!!!!</h2>
      <div align="center">
        <button onClick={handleSignout}>sign out </button>
      </div>
    </div>
  );
};

export default Home;
