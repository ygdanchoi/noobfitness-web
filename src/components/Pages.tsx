import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./auth/Auth";
import Main from "./main/Main";

const Pages = () => {
  return (
    <Switch>
      <Route path="/" exact={ true } component={ Main } />
      <Route path="/auth" exact={true} component={ Auth } />
    </Switch>
  );
};

export default Pages;