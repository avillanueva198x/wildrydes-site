import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Navigation from '../components/Navigation/Navigation';
import Routes from './Routes';
import * as actions from '../store/actions/actionsIndex';

const Layout = ({ isAuthenticated, decodedToken, onLogout, history }) => {
  const logoutHandler = () => {
    onLogout();
    history.push('/');
  };

  return (
    <Fragment>
      <Navigation
        decodedToken={decodedToken}
        isAuthenticated={isAuthenticated}
        logout={logoutHandler}
      />
      <main className='container'>
        <Routes />
      </main>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    decodedToken: state.auth.decodedToken,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Layout)
);
