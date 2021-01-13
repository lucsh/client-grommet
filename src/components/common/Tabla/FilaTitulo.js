import { Box, Button, ResponsiveContext, Text } from 'grommet';
import { Down, Up, Subtract, FormUp } from 'grommet-icons';
import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CheckBox } from 'grommet/es6';
import pluralize from '../pluralize';

const CollapseIcon = styled(Box)`
  position: absolute;
  right: 6px;
  top: 6px;
  height: 24px;
  transform: rotate(${props => (props.rotated ? '180deg' : '0deg')});
  transition: transform 0.5s ease-in-out;
`;

const Container = styled(Box)`
  box-sizing: border-box;
  transition: max-height 0.5s;
  overflow: hidden;
`;

const Info = styled(Box)`
  max-height: ${props => (props.visible ? '24px' : '0')};
  padding: ${props => (props.visible ? '2px' : '0')};
  transition: max-height 0.5s;
`;

const SetArrow = ({ column, order, onClickHandler }) => {
  let nextOrder = {
    ally: `ordenar ascendente ${column.title}`,
    orden: 'asc',
    icon: <Up color="brand" size="small" />,
  };
  if (order[column.key] === 'asc') {
    nextOrder = {
      ally: `ordenar descendente ${column.title}`,
      orden: 'desc',
      icon: <Down color="brand" size="small" />,
    };
  }
  if (order[column.key] === 'desc') {
    nextOrder = {
      ally: `quitar orden ${column.title}`,
      orden: '',
      icon: <Subtract color="brand" size="small" />,
    };
  }

  return (
    <Button
      size="small"
      a11yTitle={nextOrder.ally}
      onClick={() => onClickHandler(column.key, nextOrder.orden)}
      icon={nextOrder.icon}
    />
  );
};

const FilaTitulo = ({
  columns,
  visibleColumns,
  fixedColumns,
  onColumnOrder,
  order,
  width,
  selection,
  ids,
  selected,
  setSelected,
  disabled,
}) => {
  const size = useContext(ResponsiveContext);
  const [collapsed, setCollapsed] = useState(true);
  const [allSelected, setAllSelected] = useState(() => {
    if (selected) {
      if (selected.length === ids.length) return 1;
      if (selected.length > 0) return -1;
    }
    return 0;
  }); // 1=true 0=false -1=indeterminated => calcular

  const onChangeSelection = () => {
    // 1=true 0=false -1=indeterminated
    if (allSelected === 0) {
      let seleccionados = ids;
      if (disabled && disabled.length === 0) {
        // seleccionar todos
        setSelected(seleccionados);
        setAllSelected(1);
      } else {
        // seleccionar todos los que no estan disabled
        seleccionados = seleccionados.filter(
          value => !disabled.includes(value)
        );
        setSelected(seleccionados);

        setAllSelected(-1);
      }
    } else {
      // seleccionar ninguno
      setSelected([]);
      setAllSelected(0);
    }
  };

  const onColumnOrderHandler = (column, direction) => {
    if (order) {
      if (order[column] !== direction) {
        onColumnOrder(column, direction);
      } else {
        onColumnOrder(column, '');
      }
    }
  };

  return (
    <Container
      align="stretch"
      justify={size === 'small' ? 'start' : 'center'}
      gap="none"
      elevation="small"
      direction="column"
      background="whitesmoke"
      fill="horizontal"
      pad="none"
      margin="auto"
      style={{
        position: 'sticky',
        top: '50px',
        zIndex: '10',
      }}
    >
      <Box
        flex={false}
        style={{
          display: 'inline-block',
          position: 'relative',
          minWidth: size === 'small' ? '100%' : width,
        }}
        margin="auto"
        pad={size === 'small' ? 'small' : 'none'}
      >
        <Box direction="row-responsive" justify="between" gap="small">
          {size === 'small' ? (
            <CollapseIcon
              height="75px"
              plain
              flex={false}
              rotated={collapsed}
              onClick={() => {
                size === 'small' && setCollapsed(!collapsed);
              }}
            >
              <FormUp size="medium" color="brand" />
            </CollapseIcon>
          ) : null}
          {size !== 'small' || !collapsed ? (
            <Fragment>
              {selection ? (
                <Box align="center" justify="center" pad="small">
                  <CheckBox
                    indeterminate={allSelected === -1}
                    checked={allSelected === 1}
                    onChange={e => onChangeSelection(e)}
                  />
                </Box>
              ) : null}
              {columns.map(c => {
                if (
                  visibleColumns.includes(c.key) ||
                  fixedColumns.includes(c.key)
                )
                  return (
                    <Box
                      key={c.title}
                      direction="row"
                      gap="small"
                      pad="small"
                      align="center"
                      fill="horizontal"
                      style={{ width: size === 'small' ? '100%' : c.size }}
                    >
                      <Text weight="bold" size="small">
                        {c.title}
                      </Text>
                      {c.sortable ? (
                        <Box direction="row" pad="none">
                          <SetArrow
                            column={c}
                            order={order}
                            onClickHandler={(key, direction) =>
                              onColumnOrderHandler(key, direction)
                            }
                          />
                        </Box>
                      ) : null}
                    </Box>
                  );
              })}
            </Fragment>
          ) : (
            <Box pad="medium" align="center">
              Mostrar titulos
            </Box>
          )}
        </Box>
      </Box>
      {selection ? (
        <Info background="brand" visible={selected.length > 0}>
          <Text size="xsmall">
            {pluralize(
              selected.length,
              'item seleccionado',
              'items seleccionados'
            )}
          </Text>
        </Info>
      ) : null}
    </Container>
  );
};

FilaTitulo.defaultProps = {
  columns: [],
  visibleColumns: [],
  fixedColumns: [],
  onColumnOrder: () => {},
  order: {},
};

FilaTitulo.propTypes = {
  columns: PropTypes.array,
  visibleColumns: PropTypes.array,
  fixedColumns: PropTypes.array,
  order: PropTypes.object,
  onColumnOrder: PropTypes.func,
};

export default FilaTitulo;
