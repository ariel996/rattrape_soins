import React from 'react';
import PropTypes from 'prop-types';
import {Outlet, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import Base from '../Base';

const PrivateRoute = ({isAuthenticated}) => isAuthenticated ? <Base><Outlet/></Base> : <Navigate to='/login'/>

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
