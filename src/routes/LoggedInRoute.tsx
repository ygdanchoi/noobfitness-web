import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { history } from '../components/App';
import { AppState } from '../store/store';

interface ILoggedInRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
}

const LoggedInRoute: React.SFC<ILoggedInRouteProps> = ({
  component: Component,
  isAuthenticated
}) => {
  if (!isAuthenticated) {
    history.push('/auth');
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
)(LoggedInRoute);