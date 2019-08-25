import * as React from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';
import '../index.css';
import { AppState } from '../store/store'
import { thunkRestoreUser } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'
import Auth from './auth/Auth';
import Main from './main/Main';
import NavBar from './nav-bar/NavBar';

interface IAppProps {
  thunkRestoreUser: typeof thunkRestoreUser;
  auth: IAuthState;
}

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
    const mainOrAuth = (this.props.auth.authToken && this.props.auth.user)
      ? <Main />
      : <Auth />

    return (
      <div className="App">
        <NavBar />
        { mainOrAuth }
      </div>
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
