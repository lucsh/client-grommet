import Navbar from './nav';
import pjn from '../../utils/theme';
import styled from 'styled-components';
import React, { Component } from 'react';
import Vocabulario from '../../vocabulario';
import { Box, Grid, Grommet } from 'grommet';
import PrivateRoutes from '../../routes/Private';
import { Router } from 'react-router-dom';
import history from '../../routes/history';
import NotificationContainer from './Notification/Container';

class Layout extends Component {
  render() {
    const Content = styled(Box)`
      color: #000;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-around;
    `;

    const Footer = styled(Box)`
      background-color: #181718;
      color: #f0f0f0;
      font-size: 0.8rem;
      font-weight: 100;
      margin-top: auto;
      text-align: center;
      justify-content: center;
      align-content: stretch;
    `;

    const Grilla = styled(Grid)`
      min-height: 100vh;
      background: #f0f0f0;
    `;

    return (
      <Grommet theme={pjn}>
        <Grilla
          fill
          columns={['flex']}
          rows={['50px', 'auto', '50px']}
          areas={[
            { name: 'nav', start: [0, 0], end: [0, 0] },
            { name: 'main', start: [0, 1], end: [0, 1] },
            { name: 'foot', start: [0, 2], end: [0, 2] },
          ]}
        >
          <Navbar gridArea="nav" />
          <Router history={history}>
            <Content gridArea="main" align="center" full="true">
              <NotificationContainer>
                <PrivateRoutes />
              </NotificationContainer>
            </Content>
          </Router>

          <Footer gridArea="foot">
            <p>{Vocabulario.get('PIE_PAGINA')}</p>
          </Footer>
        </Grilla>
      </Grommet>
    );
  }
}

export default Layout;
