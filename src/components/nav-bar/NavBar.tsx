import * as React from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth.actions';
import keys from '../../config/keys';
import { AppState } from '../../store/store'
import { IUser } from '../../types/auth.types';

interface INavBarProps {
  logoutUser: typeof logoutUser;
  user: IUser | null;
}

const NavBar: React.SFC<INavBarProps> = props => {
  const logoutButton = (props.user)
    ? <GoogleLogout 
      clientId={ keys.google.clientID }
      onLogoutSuccess={ props.logoutUser } />
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

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);