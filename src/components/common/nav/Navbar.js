import Logo from './Logo';
import Title from './Title';
import NavLinks from '../../NavLinks';
import UserLinks from './UserLinks';
import MobileNavbar from './MobileNavbar';
import React, { PureComponent } from 'react';
import { mobile } from '../../../utils/media';
import Vocabulario from '../../../vocabulario';
import styled, { css } from 'styled-components';
import escudo from '../../../assets/imagenes/escudo.svg';
import { Box } from 'grommet/es6';

const Wrapper = styled.nav`
  position: fixed;
  left: 0;
  box-sizing: border-box;
  z-index: 3;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  background: ${props => (props.transparent ? 'transparent' : '#f3f3f4')};
  border-bottom: 1px solid #e7eaec !important;
  transition: background 300ms ease-out;
  color: ${props => props.color};
  padding: 0;
`;

const StartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const EndWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NormalNavbar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  ${StartWrapper}, ${EndWrapper} {
    ${mobile(css`
      display: none;
    `)};
  }
`;

class Navbar extends PureComponent {
  state = {
    isOpen: false,
  };
  render() {
    const {
      onSideToggle,
      onMobileNavToggle,
      isSideFolded,
      isMobileNavFolded,
      transparent,
    } = this.props;

    return (
      <Wrapper transparent={transparent}>
        <NormalNavbar>
          <StartWrapper>
            <Logo alt="Logo PJN" src={escudo} />
            <Title>{Vocabulario.get('CLIENT')}</Title>
            <Box
              align="center"
              margin={{ horizontal: 'medium' }}
              direction="row"
            >
              <NavLinks />
            </Box>
          </StartWrapper>
          <EndWrapper>
            <UserLinks />
          </EndWrapper>
        </NormalNavbar>
        <MobileNavbar
          isSideFolded={isSideFolded}
          isMobileNavFolded={isMobileNavFolded}
          onSideToggle={onSideToggle}
          onMobileNavToggle={onMobileNavToggle}
        />
      </Wrapper>
    );
  }
}

export default Navbar;
