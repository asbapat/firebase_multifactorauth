import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Signup from "./components/SignUp";
import Signin from "./components/SignIn";
import Home from "./components/Home";
import "./App.css";
import { firebaseAuth } from "./provider/AuthProvider";

function App() {
  const { token } = useContext(firebaseAuth);
  return (
    <div>
      <Switch>
        {/* route allows you to render by url path */}
        <Route
          exact
          path="/"
          render={(rProps) => (token === null ? <Signin /> : <Home />)}
        />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
