import config from '../config';
import Layout from './common/Layout';
import React, { PureComponent } from 'react';
import { GlobalStyle } from '../style/global';
import { authMiddleware } from '../utils/graphql';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withKeycloak from '../keycloak/WithKeycloak';

class App extends PureComponent {
  render() {
    const keycloak =
      config.keycloak.enabled && this.props.authenticator.keycloak;

    const client = new ApolloClient({
      uri: config.api.url,
      cache: new InMemoryCache(),
      request: operation => {
        authMiddleware(keycloak, operation);
      },
    });

    return (
      <ApolloProvider client={client}>
        <GlobalStyle />
        <Layout />
      </ApolloProvider>
    );
  }
}

export default withKeycloak(App);
