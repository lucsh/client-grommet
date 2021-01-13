import React from 'react';
import styled, { css } from 'styled-components';
import { Accordion, AccordionPanel, Box, Grommet } from 'grommet';

import Logo from './Logo';
import Title from './Title';
import NavLinks from '../../NavLinks';
import UserLinks from './UserLinks';
import { mobile } from '../../../utils/media';
import Vocabulario from '../../../vocabulario';

import escudo from '../../../assets/imagenes/escudo.svg';

const Wrapper = styled.div`
  display: none;
  ${mobile(css`
    display: block;
    height: 50px;
  `)};
`;
const Row = styled(Box)`
  position: absolute;
  width: 100%;
  display: block;
  max-height: 75px;
  white-space: nowrap;
  overflow-x: scroll;
`;
const Container = styled(Box)`
  position: relative;
  background: #f3f3f4;
  margin-right: 25px;
`;
const Gradient = styled(Box)`
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 75px;
  background: linear-gradient(
    to right,
    rgba(243, 243, 244, 0) 0%,
    rgba(243, 243, 244, 0.5) 90%,
    rgba(243, 243, 244, 1) 100%
  );
`;

const acordionTheme = {
  accordion: {
    border: {
      side: 'bottom',
      color: 'transparent',
    },
    icons: {
      color: { dark: '#1f3347', light: '#1f3347' },
    },
  },
};

const MobileNavbar = () => {
  return (
    <Grommet theme={acordionTheme}>
      <Wrapper>
        <Accordion margin="none">
          <AccordionPanel
            label={
              <Box
                pad="small"
                fill="vertical"
                direction="row"
                background="#f3f3f4"
              >
                <Logo compact alt="Logo PJN" src={escudo} />
                <Title>{Vocabulario.get('ACRONYM')}</Title>
              </Box>
            }
          >
            <Container>
              <Row pad="medium" direction="row-responsive" background="#f3f3f4">
                <NavLinks />
                <UserLinks />
              </Row>
              <Gradient />
            </Container>
          </AccordionPanel>
        </Accordion>
      </Wrapper>
    </Grommet>
  );
};

export default MobileNavbar;
