import React from 'react';
import { Keycloak } from './Authenticator';

/**
 * With Keycloak
 * HOC component, entrega las props requeridas en caso de que el child lo requiera, ex: logout menu button
 * @param Component
 * @returns {function(*): *}
 */
function withKeycloak(Component) {
  return function contextComponent(props) {
    return (
      <Keycloak.Consumer>
        {value => {
          return <Component {...props} authenticator={value} />;
        }}
      </Keycloak.Consumer>
    );
  };
}

export default withKeycloak;
