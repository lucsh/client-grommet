import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Box } from 'grommet';

import escudo from '../../assets/imagenes/escudo.svg';
import Vocabulario from '../../vocabulario';

const Container = styled(Box)`
  height: 100vh;
  width: 100vw;
`;
const Content = styled(Box)`
  margin: auto;
  position: relative;
`;

const pulse = keyframes`
to { 
    transform: scale(1.4);
    text-shadow:  0 0 100px #fff;
    opacity:0;
  }
`;

const Logo = styled.img`
  position: absolute;
  margin-top: -${props => props.size / 2}px;

  width: ${props => props.size}px;
  height: ${props => props.size}px;
  align-self: center;
  border-radius: 50%;
`;

const Circulo = styled.div`
  position: absolute;
  margin-top: -${props => props.size / 2}px;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: #001529;
  align-self: center;
  border-radius: 50%;
  animation: ${pulse} 2s ease-in-out infinite alternate;
  transform-origin: center;
`;

// TODO: la animacion y el componente entero deberia ser un common en client-seed
const LoadingAnimation = () => {
  return (
    <Container a11yTitle={Vocabulario.get('CARGANDO')}>
      <Content>
        <Circulo size="120" />
        <Logo src={escudo} size="120" />
      </Content>
    </Container>
  );
};

/**
 * Loading
 * proposito principal de este componente es wrapper loading State de cualquier componente
 */
const Loading = ({ isLoading, children }) =>
  isLoading ? <LoadingAnimation /> : children;

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loading;
