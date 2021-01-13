import Navbar from './Navbar';
import React from 'react';

const Nav = props => {
  const {
    onMobileNavToggle,
    isMobileNavFolded,
    transparent,
    background = '#001529',
    color = 'white',
  } = props;

  return (
    <Navbar
      transparent={transparent}
      background={background}
      color={color}
      isMobileNavFolded={isMobileNavFolded}
      onMobileNavToggle={onMobileNavToggle}
    />
  );
};

export default Nav;
