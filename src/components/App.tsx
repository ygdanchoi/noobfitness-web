import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import '../index.css';
import { AppState } from '../store/store'
import { thunkLoginUser, thunkLogoutUser, thunkRestoreUser } from '../thunks/auth.thunks';
import { IAuthState } from '../types/auth.types'
import Auth from './auth/Auth';
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
    const getExercisesButton = <button onClick={ this.getExercises }>get exercises</button>

    const main = (this.props.auth.user)
      ? <div>
          <p>exercises ({ this.state.exercises.length }): </p>
          <ul>
            { this.state.exercises.map((exercise, i) => <li key={ i }>{ JSON.stringify(exercise) }</li>) }
          </ul>
          { getExercisesButton }
        </div>
      : <Auth
        thunkLoginUser = { this.props.thunkLoginUser }
        thunkLogoutUser = { this.props.thunkLogoutUser } />

    return (
      <div className="App">
        <NavBar
          user={ this.props.auth.user }
          thunkLogoutUser = { this.props.thunkLogoutUser } />
        { main }
      </div>
    );
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
