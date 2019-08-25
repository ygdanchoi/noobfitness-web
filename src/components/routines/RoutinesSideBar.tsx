import * as React from 'react';
import { IUser } from '../../types/auth.types';

interface IRoutinesSideBarProps {
  user: IUser;
}

const RoutinesSideBar: React.SFC<IRoutinesSideBarProps> = ({ user }) => {
  return (
    <div className='RoutinesSideBar'>
      <img src={ user.avatar } alt='Avatar' width='128em' height='128em' />
      <p>{ user.username }</p>
    </div>
  );
};

export default RoutinesSideBar;