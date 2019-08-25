import * as React from 'react';
import { IUser } from '../../types/auth.types';

interface IMainSideBarProps {
  user: IUser;
}

const MainSideBar: React.SFC<IMainSideBarProps> = ({ user }) => {
  if (!user) {
    return <div className='MainSideBar' />
  }
  
  return (
    <div className='MainSideBar'>
      <img src={ user.avatar } alt='Avatar' width='128em' height='128em' />
      <p>{ user.username }</p>
    </div>
  );
};

export default MainSideBar;