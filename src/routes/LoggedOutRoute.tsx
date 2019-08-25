import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';
import { history } from '../components/App';
import { AppState } from '../store/store';

interface ILoggedOutRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

class LoggedOutRoute extends React.Component<ILoggedOutRouteProps> {
  constructor(props: ILoggedOutRouteProps) {
    super(props);
  }

  public componentDidMount() {
    this.redirect();
  }

  public componentDidUpdate() {
    this.redirect();
  }

  public render() {
    const renderComponent: ((props: RouteComponentProps<any>) => React.ReactNode) = props => {
      return <this.props.component {...props} />
    };
  
    return (
      <Route render={ renderComponent } />
    );
  }

  private redirect() {
    if (this.props.isAuthenticated) {
      history.push('/');
    }
  }
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps
)(LoggedOutRoute);