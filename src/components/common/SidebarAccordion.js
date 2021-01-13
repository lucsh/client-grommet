import React, { useState } from 'react';
import { Accordion, AccordionPanel, Box, Text } from 'grommet/es6';
import { FormNext } from 'grommet-icons/es6';
import SidebarButton from './SidebarButton';
import styled from 'styled-components';

const AccordionIcon = styled(Box)`
  margin-left: auto;
  transition: transform 0.5s ease-in-out;
  transform: rotate(${props => (props.rotated ? '90deg' : '0')});
  transform-origin: center;
`;

const Header = styled(Box)`
  text-overflow: clip;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.2s, transform 0.2s;
`;

const StyledAccordion = styled(Accordion)`
  transition: all 0.5s;
`;

function SidebarAccordion({ button, shrank }) {
  const deepLocationCheck = () => {
    let shouldSet = false;
    button.buttons.forEach(b => {
      if (b.link === location.pathname) {
        setActiveIndex(0);
        shouldSet = true;
      }
    });
    return shouldSet;
  };
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isAccordionActive, setIsAccordionActive] = useState(deepLocationCheck);

  React.useEffect(() => {
    setActiveIndex(isAccordionActive ? 0 : -1);
  }, [isAccordionActive]);

  const changeIsAccordionActive = () => {
    setIsAccordionActive(!isAccordionActive);
  };
  return (
    <StyledAccordion
      style={{ maxWidth: shrank ? '50px' : '210px' }}
      activeIndex={activeIndex}
      key={button.label}
      onActive={changeIsAccordionActive}
    >
      <AccordionPanel
        header={
          <Header
            a11yTitle={button.a11yTitle}
            pad={shrank ? 'small' : 'medium'}
            fill="horizontal"
            direction="row"
            justify="start"
            align="center"
            gap="small"
          >
            {button.icon}
            {!shrank && (
              <>
                <Text size="small">{button.label}</Text>
                <AccordionIcon rotated={isAccordionActive}>
                  <FormNext size="small" />
                </AccordionIcon>
              </>
            )}
          </Header>
        }
      >
        {button.buttons.map(subButton => (
          <SidebarButton
            location={location.pathname}
            margin="none"
            isSubMenu
            a11yTitle={subButton.a11yTitle}
            key={subButton.label}
            to={subButton.link}
            icon={subButton.icon}
            label={subButton.label}
            small={shrank}
          />
        ))}
      </AccordionPanel>
    </StyledAccordion>
  );
}

export default SidebarAccordion;
