import withKeycloak from './WithKeycloak';
import React, { Component, Children } from 'react';

class KeycloakConsumer extends Component {
  render() {
    const ChildrenWithKeycloak = Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...this.props,
      });
    });

    return <>{ChildrenWithKeycloak}</>;
  }
}

export default withKeycloak(KeycloakConsumer);
