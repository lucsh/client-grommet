import React from 'react';
import { Box, Button, Text } from 'grommet/es6';
import { FormNext } from 'grommet-icons';
import styled from 'styled-components';
import history from '../../routes/history';

const goto = to => {
  history.push(to);
};

const Link = styled(Box)`
  width: 100%;
  color: white;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.2s;
  transform: rotate(${props => props.rotation});
  border-left: ${props => (props.isActive ? '4px solid #00CFFF' : 'none')};
  &:hover,
  &:focus {
    opacity: 0.8;
  }
  &:active {
    transform: scale(0.95);
    opacity: 0.6;
  }
`;

const Container = styled(Box)`
  transition: all 0.5s, transform 0.2s;
`;

const Arrow = styled(Box)`
  margin-left: auto;
`;

const Label = styled(Text)`
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
`;

function SidebarButton({
  to,
  icon,
  label,
  small,
  a11yTitle,
  isSubMenu,
  location,
  shrank,
}) {
  const isActive = to === location;

  let margin = small ? 'small' : 'medium';

  if (isSubMenu) {
    margin = small
      ? { horizontal: 'small', vertical: 'small' }
      : { horizontal: 'medium', vertical: 'small' };
  }

  const Icon = React.cloneElement(icon, {
    size: isSubMenu ? 'small' : 'medium',
  });

  return (
    <Link isActive={isActive}>
      <Button a11yTitle={a11yTitle} onClick={() => goto(to)}>
        <Container
          style={{ maxWidth: shrank ? '50px' : '210px' }}
          gap="small"
          pad={margin}
          fill="horizontal"
          direction="row"
          justify="start"
          align="center"
        >
          {Icon}
          {!small && (
            <>
              <Label size="small">{label}</Label>
              <Arrow>
                <FormNext size="small" />
              </Arrow>
            </>
          )}
        </Container>
      </Button>
    </Link>
  );
}

export default SidebarButton;
