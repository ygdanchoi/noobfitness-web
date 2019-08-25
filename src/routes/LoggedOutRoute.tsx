import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { history } from '../components/App';
import { AppState } from '../store/store';

interface ILoggedOutRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
}

const LoggedOutRoute = ({
  component: Component,
  isAuthenticated
}: ILoggedOutRouteProps) => {
  if (isAuthenticated) {
    history.push('/');
  }

  const render: ((props: RouteComponentProps<any>) => React.ReactNode) = otherProps => <Component {...otherProps} />;

  return (
    <Route render={ render } />
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.authToken !== null && state.auth.userId !== null
});

export default connect(
  mapStateToProps
)(LoggedOutRoute);