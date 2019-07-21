import * as React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import keys from '../config/keys';
import '../index.css';

interface IAppState {
  isAuthenticated: boolean,
  token: string,
  user: any
};

class App extends React.Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuthenticated: false,
      token: '',
      user: null
    };
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  public render() {
    let googleButton: JSX.Element;
    let getCurrentUserButton: JSX.Element | null;
    if (this.state.isAuthenticated) {
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
        <p>Token: { this.state.token }</p>
        <p>user: { JSON.stringify(this.state.user) }</p>
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
    let token: string | null;
    fetch('http://localhost:5000/api/auth/google', options).then(res => {
      token = res.headers.get('x-auth-token');
      return res.json();
    }).then(user => {
      if (token) {
        this.setState({ isAuthenticated: true, token, user });
      }
    });
  }

  private handleLogoutSuccess() {
    this.setState({ isAuthenticated: false, token: '', user: null });
  }

  private getCurrentUser() {
    const options: RequestInit = {
      cache: 'default',
      headers: new Headers({ 'x-auth-token': this.state.token }),
      method: 'GET',
      mode: 'cors'
    };
    fetch(`http://localhost:5000/api/users/${this.state.user._id}`, options)
      .then(res => res.json())
      .then(res => this.setState({ user: res }));
  }
}

export default App;
