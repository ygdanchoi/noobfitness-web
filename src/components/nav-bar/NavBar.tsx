import * as React from 'react';
import { GoogleLogout } from 'react-google-login';
import keys from '../../config/keys';
import { thunkLogoutUser } from '../../thunks/auth.thunks';
import { IUser } from '../../types/auth.types';

interface INavBarProps {
  thunkLogoutUser: typeof thunkLogoutUser;
  user: IUser | null;
}

const NavBar: React.SFC<INavBarProps> = props => {
  const logoutButton = (props.user)
    ? <GoogleLogout 
      clientId={ keys.google.clientID }
      onLogoutSuccess={ props.thunkLogoutUser } />
    : null;

  return (
    <div className='NavBar'>
      <span>noob fitness</span>
      <div>
        <img src={ props.user ? props.user.avatar : 'broken'} alt='Avatar' width='48em' height='48em' />
        { logoutButton }
      </div>
    </div>
  );
};

export default NavBar;