import styled, { keyframes } from 'styled-components';
import { Spinner } from 'styled-icons/evil/Spinner';

/**
 * Loading Icon
 *
 * @param size
 * @param color
 */

const spin = keyframes`
  to {
    transform: rotate(360deg)
  }
`;

export default styled(Spinner)`
  fill: ${props => props.color};
  height: ${props => props.size};
  width: ${props => props.size};
  animation: ${spin} 1000ms linear infinite;
`;
