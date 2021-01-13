import React, { Fragment, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Text } from 'grommet';

import { Inbox } from 'styled-icons/fa-solid/Inbox';

import { isFalsy } from '../isFalsy';
import Fila from './Fila';
import FilaTitulo from './FilaTitulo';
import LoadingBlock from '../LoadingBlock';
import MenuConfig from './MenuConfig';
import { CheckBox } from 'grommet/es6';

/**
 * Tabla responsive con configuracion
 *
 *  @param {boolean} [loading = false]
 *  @param {boolean} [aislable = false] - si se puede hacer clic en las filas para aislarlas
 *  @param {string} [emptyMessage = 'Sin registros'] - Descripción cuando no hay resultados
 *  @param {function} [columns = []] - detalle de las columnas
 *  @param {array} [data = []] - los datos de la table
 *  @param {function} [onColumnOrder = () => {}] - cuando se ordena una columna
 *  @param {object} [order = {}] - el objeto que contiene el orden de las columnas
 *  @param {function} [onRowClick = () => {}] - al hacer clic en la fila si es aislable.
 *  @param {function} [onRowClose =() => {}] - al cerrar la fila aislada
 *  @param {string} [rowID] - indicador de la fila
 *  @param {boolean} [zebraInit = true] - mostrar interlineado de tabla de distintos colores
 *  @param {string} [rowHeightInit = 'small'] - altura de las filas
 *  @param {boolean} [showConfig = true] - si la tabla es configurable por el usuario
 *  @param {string} [visibleColumnsInit = []] - que columnas se muestran en la carga
 *  @param {string} [fixedColumns = []] - que columnas no se pueden ocultar
 *  @param {object} [selection = undefined] - objeto para controlar la seleccion de las filas
 */

const Tabla = ({
  loading,
  aislable,
  emptyMessage,
  columns,
  data,
  onColumnOrder,
  order,
  onRowClick,
  onRowClose,
  rowID,
  zebra: zebraInit,
  rowHeight: rowHeightInit,
  showConfig,
  visibleColumns: visibleColumnsInit,
  fixedColumns,
  selection,
}) => {
  const [zebra, setZebra] = useState(zebraInit);
  const [rowHeight, setRowHeight] = useState(rowHeightInit);
  const [selected, setSelected] = useState(selection ? selection.selected : []);
  const disabled = selection ? selection.disabled : [];

  const [localData, setLocalData] = useState(data);
  const [visibleColumns, setVisibleColumns] = useState(
    visibleColumnsInit.length > 0
      ? [...visibleColumnsInit, ...fixedColumns]
      : columns.map(c => c.key)
  );

  const eliminablesInit = visibleColumns.filter(
    item => !fixedColumns.includes(item)
  );
  const [eliminables, setEliminables] = useState(eliminablesInit);

  const [isolated, setIsolated] = useState(false);
  const [localOrder, setLocalOrder] = useState(order);
  const [showCards, setShowCards] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  const size = useContext(ResponsiveContext);

  const width = columns
    .map(
      item =>
        (visibleColumns.includes(item.key) ||
          fixedColumns.includes(item.key)) &&
        +item.size.slice(0, -2) + 20
    )
    .reduce((prev, next) => prev + next);

  const updateWidth = () => {
    if (!showCards) {
      if (width > window.innerWidth) {
        const newVisibleColumns = visibleColumns.filter(
          item => item !== eliminables[eliminables.length - 1]
        );
        setEliminables(eliminables.slice(0, -1));
        setVisibleColumns(newVisibleColumns);
      }
    }
  };

  const checkSelected = id => {
    if (disabled.includes(id)) {
      return false;
    }
    return selected.includes(id);
  };

  const checkDisabled = id => disabled.includes(id);

  const onChangeSelection = (e, id) => {
    e.stopPropagation();

    let seleccionados = [...selected];
    if (e.target.checked) {
      seleccionados.push(id);
      setSelected(seleccionados);
    } else {
      seleccionados = seleccionados.filter(value => value !== id);
      setSelected(seleccionados);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);

    return () => window.removeEventListener('resize', updateWidth);
  });

  useEffect(() => {
    selection && selection.setSelected(selected);
  }, [selected]);

  useEffect(() => {
    setLocalOrder(order);
  }, [order]);

  useEffect(() => {
    setLocalData(data);
    updateWidth();
  }, [data]);

  useEffect(() => {
    if (size === 'small') {
      setShowCards(true);
      setVisibleColumns(visibleColumnsInit);
      setEliminables(eliminablesInit);
    } else {
      setShowCards(false);
    }
  }, [size]);

  // esta cargando
  if (loading) {
    return (
      <Box justify="center" direction="column" animation="slideUp">
        <FilaTitulo
          width={width}
          columns={columns}
          visibleColumns={visibleColumns}
          fixedColumns={fixedColumns}
        />
        <Fila
          width={width}
          visibleColumns={visibleColumns}
          fixedColumns={fixedColumns}
        >
          {columns.map(column => (
            <Box
              key={column.title}
              direction="row-responsive"
              pad={{ vertical: rowHeight, horizontal: 'xsmall' }}
              align="center"
              style={{
                width: column.size,
              }}
            >
              <LoadingBlock height="16px" width={column.size} />
            </Box>
          ))}
        </Fila>
      </Box>
    );
  }

  // no hay datos
  if (isFalsy(data)) {
    return (
      <Box justify="center" direction="column" animation="slideUp">
        <FilaTitulo
          width={width}
          columns={columns}
          visibleColumns={visibleColumns}
          fixedColumns={fixedColumns}
          onColumnOrder={onColumnOrder}
        />
        <Box
          align="stretch"
          justify="center"
          gap="none"
          flex={false}
          margin="auto"
          direction="row-responsive"
          style={{ display: 'flex', maxWidth: '920px' }}
        >
          <Box width="small">
            <Text
              color="#d9d9d9"
              size="1.4em"
              weight="normal"
              textAlign="center"
            >
              <Inbox />
              {emptyMessage}
            </Text>
          </Box>
        </Box>
      </Box>
    );
  }

  const rowClickHandler = (e, id) => {
    // avoid click in row if target is checkbox
    if (e.target.type !== 'checkbox')
      if (aislable) {
        if (isolated === false) {
          setLocalData(localData.filter(o => o[rowID] === id));
          setIsolated(true);
          onRowClick(id);
        }
      } else {
        onRowClick(id);
      }
  };

  const rowCloseHandler = id => {
    setLocalData(data);
    setIsolated(false);
    document.activeElement.blur();
    onRowClose(id);
  };

  return (
    <Fragment>
      <Box
        justify="center"
        direction="row"
        wrap
        animation="slideUp"
        style={{
          minWidth: size === 'small' ? 'auto' : width,
        }}
      >
        {showConfig ? (
          <MenuConfig
            setShowCards={setShowCards}
            showCards={showCards}
            setShowLabels={setShowLabels}
            showLabels={showLabels}
            columns={columns}
            visibleColumns={visibleColumns}
            fixedColumns={fixedColumns}
            setVisibleColumns={setVisibleColumns}
            zebra={zebra}
            setZebra={setZebra}
            rowHeight={rowHeight}
            setRowHeight={setRowHeight}
            size={size}
          />
        ) : null}
        <FilaTitulo
          width={width}
          columns={columns}
          visibleColumns={visibleColumns}
          fixedColumns={fixedColumns}
          onColumnOrder={onColumnOrder}
          order={localOrder}
          ids={localData.map(dato => dato[rowID])}
          selection={selection}
          selected={selected}
          setSelected={setSelected}
          disabled={disabled}
        />
        <Box fill="horizontal" direction={showCards ? 'row' : 'column'} wrap>
          {localData.map((dato, index) => {
            let background;
            if (!showCards && zebra && !(index % 2)) {
              background = 'whitesmoke';
            }

            return (
              <Fila
                width={width}
                key={dato[rowID]}
                onClick={e => rowClickHandler(e, dato[rowID])}
                onClose={() => rowCloseHandler(dato[rowID])}
                footnote={dato.footnote}
                highlight={!!dato.highlight}
                closable={isolated}
                background={background}
                size={showCards ? 'small' : 'normal'}
                visibleColumns={visibleColumns}
                fixedColumns={fixedColumns}
              >
                {selection ? (
                  <Box align="center" justify="center" pad="small">
                    <CheckBox
                      checked={checkSelected(dato[rowID])}
                      onChange={e => onChangeSelection(e, dato[rowID])}
                      disabled={checkDisabled(dato[rowID])}
                    />
                  </Box>
                ) : null}
                {columns.map(column => {
                  const key = column.key || dato[column.key];
                  if (
                    visibleColumns.includes(column.key) ||
                    fixedColumns.includes(column.key)
                  ) {
                    return (
                      <Box
                        style={{
                          boxSizing: column.boxSizing
                            ? column.boxSizing
                            : 'border-box',
                        }}
                        key={key}
                        direction="column"
                        gap="small"
                        pad={column.pad ? column.pad : rowHeight}
                        align={showCards ? 'center' : 'start'}
                        margin="auto"
                        width={showCards ? column.sizeInCard : column.size}
                        // style={{
                        //   width: 'auto',
                        //   minWidth: showCards ? column.sizeInCard : column.size,
                        //   maxWidth: showCards ? column.sizeInCard : column.size,
                        // }}
                      >
                        {showCards && showLabels ? (
                          <Text
                            weight="bold"
                            size="9px"
                            color="grey"
                            style={{
                              textTransform: 'uppercase',
                            }}
                          >
                            {column.title}:
                          </Text>
                        ) : null}
                        {column.render ? (
                          column.render(
                            dato[column.key],
                            dato,
                            column.size,
                            showCards
                          )
                        ) : (
                          <Text
                            wordBreak="break-all"
                            weight="normal"
                            size="small"
                          >
                            {dato[column.key]}
                          </Text>
                        )}
                      </Box>
                    );
                  }
                  return null;
                })}
              </Fila>
            );
          })}
        </Box>
      </Box>
    </Fragment>
  );
};

Tabla.defaultProps = {
  loading: false,
  aislable: false,
  showConfig: false,
  columns: [],
  visibleColumns: [],
  fixedColumns: [],
  data: [],
  order: {},
  emptyMessage: 'Sin registros',
  onColumnOrder: () => {},
  onRowClick: () => {},
  rowID: undefined,
  zebra: true,
  rowHeight: 'xsmall',
  selection: undefined,
};

Tabla.propTypes = {
  zebra: PropTypes.bool,
  rowHeight: PropTypes.oneOf(['xsmall', 'small', 'medium']),
  loading: PropTypes.bool,
  aislable: PropTypes.bool,
  showConfig: PropTypes.bool,
  emptyMessage: PropTypes.string,
  columns: PropTypes.array,
  visibleColumns: PropTypes.array,
  fixedColumns: PropTypes.array,
  data: PropTypes.array,
  order: PropTypes.object,
  selection: PropTypes.object,
  onColumnOrder: PropTypes.func,
  onRowClick: PropTypes.func,
  rowID: PropTypes.string,
};

export default Tabla;
