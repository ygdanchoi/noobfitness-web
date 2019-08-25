import * as React from 'react';
import { Switch } from 'react-router-dom';
import LoggedInRoute from '../routes/LoggedInRoute';
import LoggedOutRoute from '../routes/LoggedOutRoute';
import Auth from './auth/Auth';
import Home from './home/Home';

const Pages = () => {
  return (
    <Switch>
      <LoggedInRoute path='/' exact={ true } component={ Home } />
      <LoggedOutRoute path='/auth' exact={ true } component={ Auth } />
      <LoggedInRoute component={ Home } />
    </Switch>
  );
};

export default Pages;