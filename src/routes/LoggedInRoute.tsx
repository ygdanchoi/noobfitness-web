import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { history } from '../components/App';
import { AppState } from '../store/store';

interface ILoggedInRouteProps extends RouteProps {
  isAuthenticated: boolean;
  component: React.ComponentType<any>;
}

class LoggedInRoute extends React.Component<ILoggedInRouteProps> {
  constructor(props: ILoggedInRouteProps) {
    super(props);
  }

  public componentDidUpdate() {
    if (!this.props.isAuthenticated) {
      history.push('/auth');
    }
  }

  public render() {
    const renderComponent: ((props: RouteComponentProps<any>) => React.ReactNode) = props => {
      return <this.props.component {...props} />
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
)(LoggedInRoute);