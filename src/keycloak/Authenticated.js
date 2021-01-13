import React from 'react';
import PropTypes from 'prop-types';

const NotAuthenticatedMessage = () => {
  return <div>No se pudo Autenticar...</div>;
};

/**
 * Authenticated
 *
 * @param isAuthenticated
 * @param children
 * @returns {*}
 * @constructor
 */
const Authenticated = ({ isAuthenticated, children }) =>
  !isAuthenticated ? <NotAuthenticatedMessage /> : children;

Authenticated.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Authenticated;
