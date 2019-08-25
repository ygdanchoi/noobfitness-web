import { createBrowserHistory } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import '../index.css';
import { AppState } from '../store/store'
import { thunkRestoreUser } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'
import NavBar from './nav-bar/NavBar';
import Pages from './Pages';

interface IAppProps {
  thunkRestoreUser: typeof thunkRestoreUser;
  auth: IAuthState;
}

export const history = createBrowserHistory();

class App extends React.Component<IAppProps> {
  constructor(props: IAppProps) {
    super(props);
  }

  public componentDidMount() {
    if (this.props.auth.authToken && this.props.auth.userId && !this.props.auth.user) {
      this.props.thunkRestoreUser(
        this.props.auth.authToken,
        this.props.auth.userId
      )
    }
  }

  public render() {
    return (
      <Router history={ history }>
        <NavBar />
        <Route component={ Pages } />
      </Router>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  thunkRestoreUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
