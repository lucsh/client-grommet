import _ from 'lodash';

const {
  REACT_APP_SERVER_GRAPHQL,
  REACT_APP_KK_REALM,
  REACT_APP_KK_RESOURCE,
  REACT_APP_KK_SSL_STATE,
  REACT_APP_KK_SERVER_URL,
  REACT_APP_KK_CLIENT_TYPE,
  REACT_APP_KK_CONFIDENTIAL_PORT,
  REACT_APP_KK_ENABLED,
} = process.env;
export default {
  keycloak: {
    enabled: _.defaultTo(REACT_APP_KK_ENABLED, true) === 'true',
    realm: REACT_APP_KK_REALM,
    clientId: REACT_APP_KK_RESOURCE,
    resource: REACT_APP_KK_RESOURCE,
    'ssl-required': REACT_APP_KK_SSL_STATE,
    'public-client': _.defaultTo(REACT_APP_KK_CLIENT_TYPE, true) === 'true',
    url: REACT_APP_KK_SERVER_URL,
    'confidential-port': _.toInteger(REACT_APP_KK_CONFIDENTIAL_PORT),
  },
  api: {
    url: REACT_APP_SERVER_GRAPHQL,
  },
  routes: {
    login: '/',
    main: '/main',
    second: '/second',
    personas: '/personas',
    default: '/main',
  },
};
