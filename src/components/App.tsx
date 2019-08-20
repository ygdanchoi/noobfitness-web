import * as React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { receiveCurrentUser } from '../actions/users.actions'
import keys from '../config/keys';
import '../index.css';
import { AppState } from '../store/store'
import { thunkReceiveCurrentUser } from '../thunks/users.thunks';
import { IUsersState } from '../types/users.types'

const mapStateToProps = (state: AppState) => ({
  users: state.users,
})

interface IAppProps {
  receiveCurrentUser: typeof receiveCurrentUser,
  thunkReceiveCurrentUser: typeof thunkReceiveCurrentUser,
  users: IUsersState
}

interface IAppState {
  misc: any
};

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      misc: null,
    };
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  public render() {
    let googleButton: JSX.Element;
    let getCurrentUserButton: JSX.Element | null;
    if (this.props.users.currentUser) {
      googleButton = <GoogleLogout 
        clientId={ keys.google.clientID }
        onLogoutSuccess={ this.handleLogoutSuccess } />
      getCurrentUserButton = <button onClick={ this.getCurrentUser }>
        get current user
      </button>
    } else {
      googleButton = <GoogleLogin
        clientId={ keys.google.clientID }
        onSuccess={ this.handleGoogleLogin }
        onFailure={ this.handleGoogleLogin } />
      getCurrentUserButton = null;
    }

    return (
      <div className="App">
        <p>user: { JSON.stringify(this.props.users.currentUser) }</p>
        { googleButton }
        { getCurrentUserButton }
      </div>
    );
  }
  
  private handleGoogleLogin(response: any) {
    const tokenBlob = new Blob(
      [JSON.stringify({access_token: response.accessToken})],
      {type : 'application/json'}
    );
    const options: RequestInit = {
      body: tokenBlob,
      cache: 'default',
      method: 'POST',
      mode: 'cors'
    };
    let authToken: string | null;
    fetch('http://localhost:5000/api/auth/google', options).then(res => {
      authToken = res.headers.get('x-auth-token');
      return res.json();
    }).then(user => {
      if (authToken) {
        this.props.thunkReceiveCurrentUser(user, authToken)
      }
    });
  }

  private handleLogoutSuccess() {
    this.setState({ misc: '' });
  }

  private getCurrentUser() {
    if (!this.props.users.currentUser) {
      return;
    }
    const options: RequestInit = {
      cache: 'default',
      headers: new Headers({ 'x-auth-token': this.props.users.currentUser.authToken }),
      method: 'GET',
      mode: 'cors'
    };
    fetch(`http://localhost:5000/api/users/${this.props.users.currentUser._id}`, options)
      .then(res => res.json())
      .then(res => this.setState({ misc: res }));
  }
}

export default connect(
  mapStateToProps,
  { receiveCurrentUser, thunkReceiveCurrentUser }
)(App);
