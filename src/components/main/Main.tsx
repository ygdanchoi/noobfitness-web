import axios from 'axios';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store'
import { IUser } from '../../types/auth.types';
import MainSideBar from './MainSideBar';

interface IMainProps {
  authToken: string;
  user: IUser;
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
      <div className='Main'>
        <MainSideBar user={ this.props.user } />
        <div>
          <p>exercises ({ this.state.exercises.length }): </p>
          <ul>
            { this.state.exercises.map((exercise, i) => <li key={ i }>{ JSON.stringify(exercise) }</li>) }
          </ul>
          { getExercisesButton }
        </div>
      </div>
    );
  }
  
  private async getExercises() {
    const response = await axios({
      headers: { 'x-auth-token': this.props.authToken },
      method: 'GET',
      url: 'http://localhost:5000/api/exercises'
    })

    this.setState({ exercises: response.data });
  }
}

const mapStateToProps = (state: AppState) => ({
  authToken: state.auth.authToken,
  user: state.auth.user
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);