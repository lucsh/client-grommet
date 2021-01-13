import styled, { css } from 'styled-components';

const Logo = styled.img`
  align-self: center;
  border-radius: 50%;

  ${props =>
    props.compact
      ? css`
          width: 30px;
          height: 30px;
        `
      : css`
          width: 40px;
          height: 40px;
        `};
`;

export default Logo;
