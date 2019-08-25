import * as React from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/auth.actions';
import keys from '../../config/keys';
import { AppState } from '../../store/store'
import { IAuthState } from '../../types/auth.types';

interface INavBarProps {
  logoutUser: typeof logoutUser;
  auth: IAuthState;
}

const NavBar: React.SFC<INavBarProps> = props => {
  const logoutButton = (props.auth.isAuthenticated)
    ? <GoogleLogout 
      clientId={ keys.google.clientID }
      onLogoutSuccess={ props.logoutUser } />
    : null;

  return (
    <div className='NavBar'>
      <Link to={ '/' }><span>noob fitness</span></Link>
      <div>
        <img src={ props.auth.user.avatar } alt='Avatar' width='48em' height='48em' />
        { logoutButton }
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);