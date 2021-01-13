import _ from 'lodash';
import history from '../routes/history';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import config from '../config';

export const handleGraphqlError = (extensions, message, locations, path) => {
  switch (message) {
    case '401':
      console.error(
        `[GQL]: Unauthorized, Extensions: ${extensions} , Location: ${locations}, Path: ${path}`
      );
      localStorage.removeItem('session');
      history.push(config.routes.login);
      break;

    default:
      console.error(
        `[GQL]: Unauthorized, Extensions: ${extensions} , Location: ${locations}, Path: ${path}`
      );
      break;
  }
};

export const logoutLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ extensions, message, locations, path }) =>
      handleGraphqlError(extensions, message, locations, path)
    );
  }
  if (networkError)
    console.error(`[ERROR: NETWORK ERROR]:
   ${networkError}`);
});

// AUTH MIDDLEWARE
// get the authentication token from local storage if it exists
export const authMiddleware = token =>
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${_.defaultTo(token, '')}`,
        },
      };
    });

    return forward(operation);
  });
