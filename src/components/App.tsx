import axios from 'axios';
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
  exercises: any[]
};

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      exercises: [],
    };
    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleLogoutSuccess = this.handleLogoutSuccess.bind(this);
    this.getExercises = this.getExercises.bind(this);
  }

  public render() {
    let googleButton: JSX.Element;
    let getExercisesButton: JSX.Element | null;
    if (this.props.auth.user) {
      googleButton = <GoogleLogout 
        clientId={ keys.google.clientID }
        onLogoutSuccess={ this.handleLogoutSuccess } />
        getExercisesButton = <button onClick={ this.getExercises }>
          get exercises
        </button>
    } else {
      googleButton = <GoogleLogin
        clientId={ keys.google.clientID }
        onSuccess={ this.handleGoogleLogin }
        onFailure={ this.handleGoogleLogin } />
        getExercisesButton = null;
    }

    return (
      <div className="App">
        <p>user: { JSON.stringify(this.props.auth.user) }</p>
        <p>exercises ({ this.state.exercises.length }): </p>
        <ul>
          { this.state.exercises.map((exercise, i) => <li key={ i }>{ JSON.stringify(exercise) }</li>) }
        </ul>
        { googleButton }
        { getExercisesButton }
      </div>
    );
  }
  
  private handleGoogleLogin(response: any) {
    this.props.thunkLogin(response.accessToken)
  }

  private handleLogoutSuccess() {
    this.props.thunkLogout();
    this.setState({ exercises: [] });
  }

  private async getExercises() {
    if (!this.props.auth.user) {
      return;
    }

    const response = await axios({
      headers: { 'x-auth-token': this.props.auth.user.authToken },
      method: 'GET',
      url: 'http://localhost:5000/api/exercises'
    })

    this.setState({ exercises: response.data })
  }
}

export default connect(
  mapStateToProps,
  { thunkLogin, thunkLogout }
)(App);
