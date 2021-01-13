import React from 'react';
import styled from 'styled-components';

const IconContainer = styled.div`
  display: block;
  text-align: center;
  margin: 16px;
  svg {
    height: 24px;
    width: 24px;
  }
`;

const ActionsContainer = styled.div`
  margin-left: auto;
  margin-top: auto;
  span {
    cursor: pointer;
    margin: 8px;
  }
`;

const Title = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 1em;
  line-height: 1.2em;
  margin-bottom: 16px;
`;

const Description = styled.div`
  font-size: 0.8em;
  line-height: 1.5em;
`;

const ListItem = styled.li`
  display: flex;
  padding: 24px 0;
  box-sizing: border-box;
  width: ${props => props.width}%;
`;

const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-around;
  flex-direction: ${props => props.direction};
  flex-wrap: wrap;
  li {
    flex-direction: row;
    border: ${props => (props.bordered ? '1px solid #e8e8e8' : undefined)};
    border-bottom: ${props =>
      props.bordered ? undefined : '1px solid #e8e8e8'};
    align-items: ${props => (props.direction === 'column' ? 'start' : 'start')};
    justify-content: ${props => props.justify};
  }
  ${Title} {
    color: ${props => props.accentColor};
  }
  ${IconContainer} {
    svg {
      color: ${props => props.accentColor};
    }
  }
  ${ActionsContainer} {
    color: ${props => props.accentColor};
  }
`;

export function Item({ actions = [], icon, title, description, id, basis }) {
  /**
   * List Item
   * Content Renderer
   *  @param {object[]} [actions = []] - functions to execute with a display label.
   *  @param {string | ReactNode} icon
   *  @param {string | ReactNode} title
   *  @param {string | ReactNode} description
   *  @param {string} id - action parameter.
   *  @param {number} basis - fraction < 1
   */

  const Icon = React.cloneElement(icon);
  //width: calc(1/3*100% - (1 - 1/3)*10px);
  const width = basis ? basis * 100 - (1 - basis) * 2 : 100;

  return (
    <ListItem width={width}>
      <IconContainer>{Icon}</IconContainer>
      <div>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </div>
      {actions.length > 0 && (
        <ActionsContainer>
          {actions.map(({ label, action }) => (
            <span role="button" key={label} onClick={() => action(id)}>
              {label}
            </span>
          ))}
        </ActionsContainer>
      )}
    </ListItem>
  );
}

function CustomList({
  data,
  content,
  direction = 'column',
  bordered = false,
  justify = 'space-between',
  accentColor = '#1890ff',
}) {
  /**
   * Custom List
   * Arma una lista con o sin acciones
   *  @param {string} [direction = 'column'] - any valid flex-direction.
   *  @param {string} [justify = 'column'] - any valid flex-justify.
   *  @param {array} data - data to be rendered.
   *  @param {string | ReactNode} content - render method.
   *  @param {string} [accentColor = '#1890ff] - any valid css color.
   *
   */
  return (
    <List
      direction={direction}
      bordered={bordered}
      justify={justify}
      accentColor={accentColor}
    >
      {data.map(i => {
        return content(i);
      })}
    </List>
  );
}

export default CustomList;
