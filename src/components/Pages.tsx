import * as React from 'react';
import { Switch } from 'react-router-dom';
import LoggedInRoute from '../routes/LoggedInRoute';
import LoggedOutRoute from '../routes/LoggedOutRoute';
import Auth from './auth/Auth';
import Main from './main/Main';

const Pages = () => {
  return (
    <Switch>
      <LoggedInRoute path='/' exact={ true } component={ Main } />
      <LoggedOutRoute path='/auth' exact={ true } component={ Auth } />
    </Switch>
  );
};

export default Pages;