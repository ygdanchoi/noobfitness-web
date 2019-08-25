import * as React from 'react';
import { Link } from 'react-router-dom';
import { IUserRoutine } from '../../types/auth.types';

interface IHomeMainProps {
  routines: IUserRoutine[];
}

interface IHomeMainState {
  editingRoutines: IUserRoutine[];
};

class HomeMain extends React.Component<IHomeMainProps, IHomeMainState> {
  constructor(props: IHomeMainProps) {
    super(props);
    this.state = { editingRoutines: props.routines };
  }

  public render() {
    return (
      <div className='HomeMain'>
        <p>Routines</p>
        <ul>
          { this.props.routines.map((routine, i) => <li key={ i }><Link to={ `/routines/${routine._id}` }>{ JSON.stringify(routine) }</Link></li>) }
        </ul>
      </div>
    );
  }
}

export default HomeMain;