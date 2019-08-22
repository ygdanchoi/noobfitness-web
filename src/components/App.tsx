import axios from 'axios';
import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import keys from '../config/keys';
import '../index.css';
import { AppState } from '../store/store'
import { thunkLoginUser, thunkLogoutUser, thunkRestoreUser } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'
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
    let googleButton: JSX.Element | null = null;
    let getExercisesButton: JSX.Element | null = null;
    if (!this.props.auth.user) {
      googleButton = <GoogleLogin
        clientId={ keys.google.clientID }
        onSuccess={ this.handleGoogleLogin }
        onFailure={ this.props.thunkLogoutUser } />
      getExercisesButton = null;
    }

    return (
      <div className="App">
        <NavBar
          user={ this.props.auth.user }
          thunkLogoutUser = { this.props.thunkLogoutUser } />
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
