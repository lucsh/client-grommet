import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Box, Heading } from 'grommet';
import { mobile } from '../utils/media';
import Vocabulario from '../vocabulario';
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
  border-top: 1px solid #aaaaaa;
`;

class Content extends Component {
  render() {
    return (
      <Welcome>
        <Heading size="large" margin="small" color="muted" level="2">
          ERROR #404
        </Heading>
        <Heading size="small" margin="small" color="muted" level="1">
          {Vocabulario.get('NOT FOUND')}
        </Heading>
        <AppName color="muted" level="3">
          {Vocabulario.get('CLIENT DESCRIPTION')}
        </AppName>
      </Welcome>
    );
  }
}

export default Content;
