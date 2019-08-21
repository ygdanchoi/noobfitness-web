import * as React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import keys from '../config/keys';
import '../index.css';
import { AppState } from '../store/store'
import { thunkLogin, thunkLogout } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
})

interface IAppProps {
  thunkLogin: typeof thunkLogin,
  thunkLogout: typeof thunkLogout,
  auth: IAuthState
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
    if (this.props.auth.user) {
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
        <p>user: { JSON.stringify(this.props.auth.user) }</p>
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
        this.props.thunkLogin(user, authToken)
      }
    });
  }

  private handleLogoutSuccess() {
    this.props.thunkLogout();
  }

  private getCurrentUser() {
    if (!this.props.auth.user) {
      return;
    }
    const options: RequestInit = {
      cache: 'default',
      headers: new Headers({ 'x-auth-token': this.props.auth.user.authToken }),
      method: 'GET',
      mode: 'cors'
    };
    fetch(`http://localhost:5000/api/users/${this.props.auth.user._id}`, options)
      .then(res => res.json())
      .then(res => this.setState({ misc: res }));
  }
}

export default connect(
  mapStateToProps,
  { thunkLogin, thunkLogout }
)(App);
