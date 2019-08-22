import * as React from 'react';
import { connect } from 'react-redux';
import '../index.css';
import { AppState } from '../store/store'
import { thunkLoginUser, thunkLogoutUser, thunkRestoreUser } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'
import Auth from './auth/Auth';
import Main from './main/Main';
import NavBar from './nav-bar/NavBar';

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
})

interface IAppProps {
  thunkLoginUser: typeof thunkLoginUser;
  thunkLogoutUser: typeof thunkLogoutUser;
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
      ? <Main
        authToken={ this.props.auth.authToken }
        user={ this.props.auth.user } />
      : <Auth
        thunkLoginUser={ this.props.thunkLoginUser }
        thunkLogoutUser={ this.props.thunkLogoutUser } />

    return (
      <div className="App">
        <NavBar
          user={ this.props.auth.user }
          thunkLogoutUser={ this.props.thunkLogoutUser } />
        { mainOrAuth }
      </div>
    );
  }

}

export default connect(
  mapStateToProps,
  { thunkLoginUser, thunkLogoutUser, thunkRestoreUser }
)(App);
