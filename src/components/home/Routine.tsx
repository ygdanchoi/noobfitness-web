import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/store'
import { IAuthState } from '../../types/auth.types';
import HomeMain from './HomeMain';
import HomeSideBar from './HomeSideBar';

interface IHomeProps {
  auth: IAuthState;
}

interface IHomeState {
  isEditing: boolean;
};

class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);

    this.state = { isEditing: false };
  }

  public render() {
    return (
      <div className='Home'>
        <HomeSideBar user={ this.props.auth.user } />
        <HomeMain routines={ this.props.auth.user.routines } />
      </div>
    );
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
)(Home);