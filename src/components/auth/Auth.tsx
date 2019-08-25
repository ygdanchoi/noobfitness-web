import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth.actions';
import keys from '../../config/keys';
import { AppState } from '../../store/store'
import { thunkLoginUser } from '../../thunks/auth.thunks';

interface IAuthProps {
  logoutUser: typeof logoutUser;
  thunkLoginUser: typeof thunkLoginUser;
}

const Auth: React.SFC<IAuthProps> = props => {
  const handleSuccess = (response: any) => props.thunkLoginUser(response.accessToken);
  const handleFailure = (response: any) => props.logoutUser();

  const googleButton = <GoogleLogin
    clientId={ keys.google.clientID }
    onSuccess={ handleSuccess }
    onFailure={ handleFailure } />


  return (
    <div className='Auth'>
      { googleButton }
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser,
  thunkLoginUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);