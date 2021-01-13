import _ from 'lodash';
import React from 'react';
import Loading from '../components/common/Loading';
import KeycloakJS from 'keycloak-js';
import PropTypes from 'prop-types';
import Authenticated from './Authenticated';
import ErrorBoundary from '../components/common/ErrorBoundary';
import config from '../config';

export const Keycloak = React.createContext();

/**
 * Authenticator
 * Keycloak Provider, Recibe la config leida de los envs y setea
 */
class Authenticator extends React.Component {
  state = { keycloak: null, authenticated: false };

  componentDidMount() {
    if (config.keycloak.enabled) {
      this.startup();
    }
  }

  startup = async () => {
    try {
      const { keycloakConfig } = this.props;
      const keycloak = KeycloakJS(keycloakConfig);
      const authenticated = await keycloak.init({
        onLoad: 'login-required',
        promiseType: 'native',
        checkLoginIframe: false,
      });
      this.setState({ keycloak, authenticated });
    } catch (e) {
      throw new Error(`No pudimos establecer conexion con Keycloak: ${e}`);
    }
  };

  render() {
    if (!config.keycloak.enabled) {
      return <ErrorBoundary>{this.props.children}</ErrorBoundary>;
    }

    const { keycloak, authenticated } = this.state;
    return (
      <ErrorBoundary>
        <Loading isLoading={_.isEmpty(keycloak)}>
          <Authenticated isAuthenticated={authenticated}>
            <Keycloak.Provider value={{ keycloak, authenticated }}>
              {this.props.children}
            </Keycloak.Provider>
          </Authenticated>
        </Loading>
      </ErrorBoundary>
    );
  }
}

Authenticator.propTypes = {
  keycloakConfig: PropTypes.shape({
    realm: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    'ssl-required': PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    'public-client': PropTypes.bool.isRequired,
    'confidential-port': PropTypes.number.isRequired,
  }).isRequired,
};

export default Authenticator;
