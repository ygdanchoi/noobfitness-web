import axios from 'axios';
import * as React from 'react';
import { IAuthState } from 'src/types/auth.types';

interface IMainProps {
  auth: IAuthState;
}

interface IMainState {
  exercises: any[];
};

class Main extends React.Component<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      exercises: [],
    };

    this.getExercises = this.getExercises.bind(this);
  }

  public render() {
    const getExercisesButton = <button onClick={ this.getExercises }>get exercises</button>

    return (
      <div>
        <p>exercises ({ this.state.exercises.length }): </p>
        <ul>
          { this.state.exercises.map((exercise, i) => <li key={ i }>{ JSON.stringify(exercise) }</li>) }
        </ul>
        { getExercisesButton }
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

    this.setState({ exercises: response.data });
  }
}

export default Main;
