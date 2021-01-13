import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  DropButton,
  RadioButtonGroup,
  Text,
} from 'grommet';
import { Close, SettingsOption } from 'grommet-icons';
import PropTypes from 'prop-types';

const DropContent = ({
  onClose,
  setShowCards,
  showCards,
  showLabels,
  setShowLabels,
  visibleColumns,
  fixedColumns,
  columns,
  setVisibleColumns,
  zebra,
  setZebra,
  rowHeight,
  setRowHeight,
  size,
}) => {
  const [checked, setChecked] = useState(visibleColumns);

  useEffect(() => {
    setVisibleColumns([...checked, ...fixedColumns]);
  }, [checked]);

  useEffect(() => {
    if (showCards) {
      setZebra(false);
      setRowHeight('small');
    }
  }, [showCards]);

  const onCheckAll = event => {
    if (event.target.checked) {
      setChecked(columns.map(c => c.key));
    } else {
      setChecked([]);
    }
  };

  const onCheck = (event, value) => {
    if (event.target.checked) {
      setChecked([...checked, ...fixedColumns, value]);
    } else {
      setChecked(checked.filter(item => item !== value));
    }
  };
  return (
    <Box
      pad="none"
      gap="medium"
      margin="small"
      direction="row-responsive"
      height={{ max: '100%' }}
    >
      <Box direction="row" justify="end" align="start">
        <Button
          icon={<Close color="status-error" size="small" />}
          onClick={onClose}
        />
      </Box>
      {size !== 'small' ? (
        <Box>
          <Box background="lightgray" pad="small" flex={false}>
            <Text>Contenido</Text>
          </Box>
          <Box direction="column" gap="medium" pad="small" fill>
            <CheckBox
              checked={showCards}
              label="Mostrar Tarjetas"
              onChange={() => setShowCards(!showCards)}
            />
            {showCards ? (
              <CheckBox
                checked={showLabels}
                label="Mostrar Etiquetas"
                onChange={() => setShowLabels(!showLabels)}
              />
            ) : null}
            <CheckBox
              checked={zebra}
              label="Mostrar Interlineado"
              disabled={showCards}
              onChange={() => setZebra(!zebra)}
            />
          </Box>
        </Box>
      ) : null}
      {size !== 'small' ? (
        <Box>
          <Box background="lightgray" pad="small" flex={false}>
            <Text>Tamaño</Text>
          </Box>
          <Box direction="column" gap="medium" pad="small">
            <RadioButtonGroup
              disabled={showCards}
              name="doc"
              options={[
                { label: 'Chico', value: 'xsmall' },
                { label: 'Medio', value: 'small' },
                { label: 'Grande', value: 'medium' },
              ]}
              value={rowHeight}
              onChange={event => setRowHeight(event.target.value)}
            />
          </Box>
        </Box>
      ) : null}
      <Box>
        <Box background="lightgray" pad="small" flex={false}>
          <Text>Columnas</Text>
        </Box>

        <Box direction="column" gap="medium" pad="small">
          <CheckBox
            checked={checked.length === columns.length}
            indeterminate={
              checked.length + fixedColumns.length > 0 &&
              checked.length < columns.length
            }
            label="Todas"
            onChange={onCheckAll}
          />
          {columns.map(item => (
            <CheckBox
              key={item.key}
              checked={
                checked.includes(item.key) || fixedColumns.includes(item.key)
              }
              disabled={fixedColumns.includes(item.key)}
              label={item.title}
              onChange={e => onCheck(e, item.key)}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const MenuConfig = ({
  setShowCards,
  showCards,
  setShowLabels,
  showLabels,
  columns,
  visibleColumns,
  fixedColumns,
  setVisibleColumns,
  zebra,
  setZebra,
  rowHeight,
  setRowHeight,
  size,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box align="end" margin={{ left: 'xsmall', right: 'auto' }}>
      <DropButton
        pad="small"
        a11yTitle="Configuración de la tabla"
        label="Configurar"
        icon={<SettingsOption size="small" color="black" />}
        plain
        open={open}
        onOpen={onOpen}
        onClose={onClose}
        dropContent={
          <DropContent
            setShowCards={setShowCards}
            showCards={showCards}
            setShowLabels={setShowLabels}
            showLabels={showLabels}
            columns={columns}
            visibleColumns={visibleColumns}
            fixedColumns={fixedColumns}
            setVisibleColumns={setVisibleColumns}
            onClose={onClose}
            zebra={zebra}
            setZebra={setZebra}
            rowHeight={rowHeight}
            setRowHeight={setRowHeight}
            size={size}
          />
        }
        dropProps={{ align: { top: 'bottom' } }}
      />
    </Box>
  );
};

MenuConfig.defaultProps = {
  setShowCards: () => {},
  setShowLabels: () => {},
  setVisibleColumns: () => {},
  setZebra: () => {},
  setRowHeight: () => {},
  columns: [],
  showCards: false,
  showLabels: false,
  visibleColumns: [],
  fixedColumns: [],
  zebra: true,
  rowHeight: 'small',
  size: 'medium',
};

MenuConfig.propTypes = {
  setShowCards: PropTypes.func,
  setShowLabels: PropTypes.func,
  setVisibleColumns: PropTypes.func,
  setZebra: PropTypes.func,
  setRowHeight: PropTypes.func,
  columns: PropTypes.array,
  showCards: PropTypes.bool,
  showLabels: PropTypes.bool,
  visibleColumns: PropTypes.array,
  fixedColumns: PropTypes.array,
  zebra: PropTypes.bool,
  rowHeight: PropTypes.oneOf(['xsmall', 'small', 'medium']),
  size: PropTypes.string,
};
export default MenuConfig;
