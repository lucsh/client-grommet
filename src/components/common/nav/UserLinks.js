import _ from 'lodash';
import React from 'react';
import styled, { css } from 'styled-components';

import { Logout } from 'grommet-icons';
import withKeycloak from '../../../keycloak/WithKeycloak';
import { Button, Menu, Text } from 'grommet';
import { mobile } from '../../../utils/media';
import config from '../../../config';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  margin-left: auto;
  ${mobile(css`
    display: inline-block;
  `)};
`;

const UserMenu = styled(Menu)`
  ${mobile(css`
    display: none;
  `)};
`;

const UserName = styled.div`
  color: #676a6c;
  padding: 0 4px;
`;

const NavLink = styled(Button)`
  flex: 0 0 auto;
  display: inline-block;
  transition: opacity 0.2s, transform 0.2s;
  cursor: pointer;
  align-items: center;
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

  a {
    color: white;
    text-decoration: none;
  }
`;

const NavLinkMobile = styled(NavLink)`
  display: none;

  ${mobile(css`
    display: inline-block;
  `)};
`;

class UserLinks extends React.PureComponent {
  state = {
    userInfo: {},
  };

  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo = async () => {
    if (config.keycloak.enabled) {
      const { authenticator } = this.props;
      const userInfo = await authenticator.keycloak.loadUserInfo();
      this.setState({ userInfo });
    } else {
      this.setState({ userInfo: { preferred_username: 'DUMMY' } });
    }
  };

  logout = () => {
    if (config.keycloak.enabled) {
      const { authenticator } = this.props;
      authenticator.keycloak.logout();
    } else {
      console.log('*** USER LOGGED OUT ***');
    }
  };

  render() {
    const { userInfo } = this.state;
    return (
      <Wrapper>
        <UserMenu
          size="small"
          dropBackground="#f3f3f4"
          label={<UserName>{_.get(userInfo, 'name')}</UserName>}
          items={[
            {
              label: 'Salir',
              onClick: () => this.logout(),
            },
          ]}
        />

        <a onClick={() => this.logout()}>
          <NavLinkMobile>
            <Logout size="small" />
            <Text margin="small">Salir</Text>
          </NavLinkMobile>
        </a>
      </Wrapper>
    );
  }
}

export default withKeycloak(UserLinks);
