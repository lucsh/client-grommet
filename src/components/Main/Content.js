import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Box, Heading } from 'grommet/es6/index';
import { mobile } from '../../utils/media';
import Vocabulario from '../../vocabulario';
const Welcome = styled(Box)`
  padding: 20vh;
  && {
    ${mobile(css`
      padding: 10px;
    `)};
  }
`;

const AppName = styled(Heading)`
  margin: 0;
  padding: 10px 0 0 0;
  border-top: 1px solid black;
`;

class Content extends Component {
  render() {
    return (
      <Welcome>
        <Heading margin="small" color="dark" level="1">
          {Vocabulario.get('OWNER')}
        </Heading>
        <AppName color="dark" level="3">
          {Vocabulario.get('CLIENT')}
        </AppName>
      </Welcome>
    );
  }
}

export default Content;
