import PropTypes from 'prop-types';
import React from 'react';
import Loading from './Skeleton';

/**
 * Conditional Render
 * Main purpose of this component is to allow readability on components
 * while removing responsibility from components and also increasing re-usability
 */

const ConditionalRender = ({ shouldRender, children, showProgress }) => {
  if (shouldRender) return children;
  if (showProgress) return <Loading lineas={2} />;
  return null;
};

ConditionalRender.defaultProps = {
  shouldRender: false,
};

ConditionalRender.propTypes = {
  // Should I render?
  shouldRender: PropTypes.bool,
  // Should I show a loading state?
  showProgress: PropTypes.bool,
};

ConditionalRender.defaultProps = {
  shouldRender: false,
  showProgress: false,
};

export default ConditionalRender;
