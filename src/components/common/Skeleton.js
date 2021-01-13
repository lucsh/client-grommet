import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const skeleton = keyframes`
    0% {
     background-position: 100% 50%;
    }
    100% {
     background-position: 0 50%;
    }
`;

const Rib = styled.div`
  background: linear-gradient(90deg, #bbb 25%, #dedede 37%, #bbb 63%);
  width: 100%;
  height: 16px;
  margin-bottom: 14px;
  animation: ${skeleton} 1.5s ease infinite;
  background-size: 400% 100%;
`;

const Container = styled.div`
  min-width: 90%;
  margin: 14px 0;
`;

class Skeleton extends React.Component {
  render() {
    const numeroParrafos = this.props.lineas;

    return (
      <Container>
        {[...Array(numeroParrafos)].map((item, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <Rib key={index} />;
        })}
      </Container>
    );
  }
}

Skeleton.propTypes = {
  lineas: PropTypes.number,
};

Skeleton.defaultProps = {
  lineas: 1,
};

export default Skeleton;
