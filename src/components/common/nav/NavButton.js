import React from 'react';
import { Box, Button } from 'grommet/es6';
import styled, { css } from 'styled-components';
import history from '../../../routes/history';
import { mobile } from '../../../utils/media';

const goto = to => {
  history.push(to);
};

const Link = styled(Box)`
  display: flex;
  align-items: center;
  height: 50px;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  color: #676a6c;
  padding: 0 1em;
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
  ${mobile(css`
    display: inline-block;
    height: 50px;
  `)};
`;

const Container = styled(Box)`
  transition: all 0.2s, transform 0.2s;
`;
const Icon = styled(Box)`
  margin: 0 10px;
`;

function NavButton({ to, icon, label, a11yTitle }) {
  return (
    <Link>
      <Button fill a11yTitle={a11yTitle} onClick={() => goto(to)}>
        <Container
          fill="horizontal"
          direction="row"
          justify="between"
          align="center"
        >
          <Icon>{icon}</Icon>
          {label}
        </Container>
      </Button>
    </Link>
  );
}

export default NavButton;
