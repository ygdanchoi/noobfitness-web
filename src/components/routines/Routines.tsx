import * as React from 'react';
import { connect } from 'react-redux';
import { getExercises } from '../../api/axios';
import { AppState } from '../../store/store'
import { IAuthState } from '../../types/auth.types';
import RoutinesSideBar from './RoutinesSideBar';

interface IRoutinesProps {
  auth: IAuthState;
}

interface IRoutinesState {
  exercises: any[];
};

class Routines extends React.Component<IRoutinesProps, IRoutinesState> {
  constructor(props: IRoutinesProps) {
    super(props);
    this.state = {
      exercises: [],
    };

    this.handleButton = this.handleButton.bind(this);
  }

  public render() {
    const getExercisesButton = <button onClick={ this.handleButton }>get exercises</button>

    return (
      <div className='Routines'>
        <RoutinesSideBar user={ this.props.auth.user } />
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
  
  private async handleButton() {
    const response = await getExercises(this.props.auth.authToken);
    this.setState({ exercises: response.data });
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routines);