import _ from 'lodash';
import Loading from '../components/common/Loading';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import withKeycloak from './WithKeycloak';

/**
 * User Info
 * HOC para datos de usuario. La implementacion del mismo puede ser independiente.
 */
class UserInfo extends Component {
  state = {
    userInfo: {},
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = () =>
    this.props.keycloak
      .loadUserInfo()
      .then(userInfo => this.setState(userInfo));

  render() {
    const { userInfo } = this.state;
    const { keycloak, children } = this.props;
    const ChildrenWithUserInfo = React.Children.map(children, child => {
      return React.cloneElement(child, {
        ...this.props,
        userInfo: this.state,
        logout: keycloak.logout,
      });
    });
    return (
      <Loading isLoading={_.isEmpty(userInfo)}>{ChildrenWithUserInfo}</Loading>
    );
  }
}

UserInfo.propTypes = {
  keycloak: PropTypes.object.isRequired,
};

export default withKeycloak(UserInfo);
