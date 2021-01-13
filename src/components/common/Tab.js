import React from 'react';
import { Tab, Box, defaultProps } from 'grommet';
import styled, { keyframes } from 'styled-components';

const BRAND_COLOR = defaultProps.theme.global.colors['brand'];
const BLACK_COLOR = defaultProps.theme.global.colors['grey'];

const StyledTab = styled(Tab)`
  font-size: 16px;
  font-weight: 400;
  padding: 10px 15px;
  text-transform: capitalize;
  border-radius: 0;
  border-bottom: solid 1px
    ${props => (!props.active ? BLACK_COLOR : BRAND_COLOR)};
  color: ${props => (props.active ? BRAND_COLOR : BLACK_COLOR)};
`;
const swoopRight = keyframes`
  from {
   transform: translateX(-100px)
  }

  to {
    transform: translateX(12px)
  }
`;

const swoopLeft = keyframes`
  from {
   transform: translateX(112px)
  }

  to {
    transform: translateX(12px)
  }
`;

const TriangleLeft = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: solid 7px ${BRAND_COLOR};
  margin-top: -7px;
  margin-left: 12px;
  animation: ${swoopLeft} 250ms ease-in;
`;

const TriangleRight = styled.div`
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: solid 7px ${BRAND_COLOR};
  margin-top: -7px;
  margin-left: 12px;
  animation: ${swoopRight} 250ms ease-in;
`;

function CustomTab(props) {
  const right = props.swoop === 'swoopRight';
  return (
    <Box>
      <StyledTab {...props} plain />
      {props.active && right && <TriangleRight />}
      {props.active && !right && <TriangleLeft />}
    </Box>
  );
}

export default CustomTab;
