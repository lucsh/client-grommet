import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Authenticator from './keycloak/Authenticator';
import config from './config';

const { keycloak } = config;
ReactDOM.render(
  <Authenticator keycloakConfig={keycloak}>
    <App />
  </Authenticator>,
  document.getElementById('app')
);
