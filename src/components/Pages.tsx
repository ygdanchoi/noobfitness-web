import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoggedInRoute from '../routes/LoggedInRoute';
import LoggedOutRoute from '../routes/LoggedOutRoute';
import Auth from './auth/Auth';
import Home from './home/Home';
import NotFound from './not-found/NotFound';
import Routine from './routine/Routine'
import Workout from './workout/Workout';

const Pages = () => {
  return (
    <Switch>
      <LoggedInRoute path='/' exact={ true } component={ Home } />
      <LoggedOutRoute path='/auth' exact={ true } component={ Auth } />
      <LoggedInRoute path='/routines/:routineId' component={ Routine } />
      <LoggedInRoute path='/workouts/:workoutId' component={ Workout } />
      <Route component={ NotFound } />
    </Switch>
  );
};

export default Pages;