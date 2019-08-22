import axios from 'axios';
import * as React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import keys from '../config/keys';
import '../index.css';
import { AppState } from '../store/store'
import { thunkLoginUser, thunkLogoutUser, thunkRestoreUser } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
})

interface IAppProps {
  thunkLoginUser: typeof thunkLoginUser;
  thunkLogoutUser: typeof thunkLogoutUser;
  thunkRestoreUser: typeof thunkRestoreUser;
  auth: IAuthState;
}

interface IAppState {
  exercises: any[];
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

  public componentDidMount() {
    if (this.props.auth.authToken && this.props.auth.userId && !this.props.auth.user) {
      this.props.thunkRestoreUser(
        this.props.auth.authToken,
        this.props.auth.userId
      )
    }
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
        <p>auth: { JSON.stringify(this.props.auth) }</p>
        <ul>
          { this.state.exercises.map((exercise, i) => <li key={ i }>{ JSON.stringify(exercise) }</li>) }
        </ul>
        { googleButton }
        { getExercisesButton }
      </div>
    );
  }
  
  private handleGoogleLogin(response: any) {
    this.props.thunkLoginUser(response.accessToken)
  }

  private handleLogoutSuccess() {
    this.props.thunkLogoutUser();
    this.setState({ exercises: [] });
  }

  private async getExercises() {
    if (!this.props.auth.user) {
      return;
    }

    const response = await axios({
      headers: { 'x-auth-token': this.props.auth.authToken },
      method: 'GET',
      url: 'http://localhost:5000/api/exercises'
    })

    this.setState({ exercises: response.data })
  }
}

export default connect(
  mapStateToProps,
  { thunkLoginUser, thunkLogoutUser, thunkRestoreUser }
)(App);
