import * as React from 'react';
import { IUser } from '../../types/auth.types';

interface IHomeSideBarProps {
  user: IUser;
}

const HomeSideBar: React.SFC<IHomeSideBarProps> = ({ user }) => {
  return (
    <div className='HomeSideBar'>
      <img src={ user.avatar } alt='Avatar' width='128em' height='128em' />
      <p>{ user.username }</p>
    </div>
  );
};

export default HomeSideBar;