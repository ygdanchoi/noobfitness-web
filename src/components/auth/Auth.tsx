import * as React from 'react';
import { GoogleLogin } from 'react-google-login';
import keys from '../../config/keys';
import { thunkLoginUser, thunkLogoutUser } from '../../thunks/auth.thunks';

interface IAuthProps {
  thunkLoginUser: typeof thunkLoginUser;
  thunkLogoutUser: typeof thunkLogoutUser;
}

const Auth: React.SFC<IAuthProps> = props => {
  const handleSuccess = (response: any) => props.thunkLoginUser(response.accessToken);
  const handleFailure = (response: any) => props.thunkLogoutUser();

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

export default Auth;