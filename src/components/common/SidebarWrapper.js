import React, { useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { FormPrevious } from 'grommet-icons';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import SidebarButton from './SidebarButton';
import SidebarAccordion from './SidebarAccordion';

/**
 * Sidebar Wrapper
 *
 * @param startShrinked
 *
 */

const Container = styled(Box)`
  box-sizing: border-box;
  transition: all 0.5s;
`;

const Title = styled(Text)`
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
`;

const Icon = styled(Button)`
  transition: transform 0.5s ease-in-out;
  transform: rotate(${props => props.rotation});
`;

function SidebarWrapper({ startShrinked, location, buttons, title = '' }) {
  const [shrank, setShrank] = useState(startShrinked);

  const [rotation, setRotation] = React.useState(
    startShrinked ? '180deg' : '0deg'
  );

  const changeShrinked = () => {
    setShrank(!shrank);
    setRotation(!shrank && '180deg');
  };

  return (
    <Container style={{ minWidth: shrank ? '50px' : '210px' }}>
      <Box
        pad="small"
        direction="row"
        fill="horizontal"
        align="center"
        justify="between"
      >
        <Title
          style={{
            maxWidth: shrank ? '0px' : '210px',
            maxHeight: shrank ? '0px' : '50px',
          }}
        >
          {title.toUpperCase()}
        </Title>

        <Icon
          rotation={rotation}
          icon={<FormPrevious size="medium" color="white" />}
          onClick={() => changeShrinked()}
        />
      </Box>
      {buttons.map(button => {
        if (Array.isArray(button.buttons)) {
          return (
            <SidebarAccordion
              key={button.label}
              button={button}
              shrank={shrank}
            />
          );
        }
        return (
          <SidebarButton
            shrank={shrank}
            location={location.pathname}
            a11yTitle={button.a11yTitle}
            key={button.label}
            to={button.link}
            label={button.label}
            icon={button.icon}
            small={shrank}
          />
        );
      })}
    </Container>
  );
}

export default withRouter(SidebarWrapper);
