import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { history } from '../components/App';
import { AppState } from '../store/store';

interface ILoggedOutRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
}

class LoggedOutRoute extends React.Component<ILoggedOutRouteProps> {
  constructor(props: ILoggedOutRouteProps) {
    super(props);
  }

  public componentDidUpdate() {
    if (this.props.isAuthenticated) {
      history.push('/');
    }
  }

  public render() {
    const renderComponent: ((props: RouteComponentProps<any>) => React.ReactNode) = otherProps => {
      return <this.props.component {...otherProps} />
    };
  
    return (
      <Route render={ renderComponent } />
    );
  }
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.authToken !== null && state.auth.userId !== null
});

export default connect(
  mapStateToProps
)(LoggedOutRoute);