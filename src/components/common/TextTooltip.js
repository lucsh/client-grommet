import React from 'react';
import { mobile } from '../../utils/media';

import { Box, Text } from 'grommet';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Arrow = styled.div`
  position: absolute;
  display: none;
  width: 0px;
  height: 0px;
  background: transparent;
  pointer-events: none;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  margin-left: 7px;
  border-bottom: 5px solid #181718;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const MobileTooltip = styled(Text)`
  display: none;
`;
const Tooltip = styled(Text)`
  color: white;
  border-radius: 2px;
  font-size: 80%;
  font-weight: normal;
  display: none;
  position: absolute;
  margin: 5px;
  z-index: 150;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
`;

const StyledText = styled(Text)`
  cursor: pointer;
  :hover ${Tooltip} {
    display: block;
    background: #181718;
    padding: 5px;
  }
   :hover ${Arrow} {
    display: block;
  }
  ${mobile(css`
    white-space: unset;
    cursor: default;
    ${MobileTooltip} {
      display: block;
    }
    :hover ${Tooltip} {
      display: none;
    }
    :hover ${Arrow} {
      display: none;
    }
  `)};
  }
`;

const TextTooltip = ({ content, tooltip, ...props }) => {
  return (
    <Box {...props} height="auto" pad="none">
      <StyledText truncate {...props} wordBreak="break-word">
        {content}
        <Arrow />

        <Tooltip color="black">{tooltip ? tooltip : content}</Tooltip>
      </StyledText>
    </Box>
  );
};

TextTooltip.defaultProps = {
  content: 'status-error',
  tooltip: '',
};

TextTooltip.propTypes = {
  color: PropTypes.arrayOf(PropTypes.element),
  description: PropTypes.arrayOf(PropTypes.element) || PropTypes.string,
};
export default TextTooltip;
