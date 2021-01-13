import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import styled, { keyframes } from 'styled-components';

const skeleton = keyframes`
    0% {
     background-position: 100% 50%;
    }
    100% {
     background-position: 0 50%;
    }
`;

const Block = styled(Box)`
  background: linear-gradient(90deg, #ddd 25%, #f0f0f0 37%, #ddd 63%);
  height: ${props => (props.height ? props.height : '100%')};
  width: ${props => props.width};
  animation: ${skeleton} 1.5s ease infinite;
  background-size: 400% 100%;
`;

const LoadingBlock = ({ height, width }) => {
  return <Block height={height} width={width} />;
};

LoadingBlock.propTypes = {
  shouldRender: PropTypes.string,
  showProgress: PropTypes.string,
};

LoadingBlock.defaultProps = {
  height: '16px',
  width: '100%',
};
export default LoadingBlock;
