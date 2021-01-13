import React from 'react';
import { Box, Text } from 'grommet/es6';
import { Alert, FormClose } from 'grommet-icons';
import PropTypes from 'prop-types';

const Fila = ({
  onClick,
  highlight,
  footnote,
  children,
  onClose,
  closable,
  background,
  size,
  visibleColumns,
  width,
}) => {
  if (visibleColumns.length === 0) {
    return null;
  }

  const border = highlight
    ? { color: 'status-warning', size: 'xsmall' }
    : {
        color: '#dbdbdb',
        size: 'xsmall',
        side: size === 'small' ? 'all' : 'top',
      };

  const round = size === 'small' && !highlight ? 'xsmall' : 'none';
  return (
    <Box
      flex={false}
      style={{
        display: 'inline-block',
        position: 'relative',
        minWidth: size === 'small' ? 'auto' : width,
      }}
      margin="auto"
      pad={size === 'small' ? 'small' : 'none'}
    >
      <Box direction="column">
        <Box
          align="stretch"
          justify="start"
          gap="none"
          // margin="auto"
          border={border}
          round={round}
          background={background}
          onClick={onClick}
          direction="row"
          wrap
          width={{ max: size === 'small' ? 'medium' : undefined }}
          height={{ min: closable ? '100px' : 'auto' }}
        >
          {children ? children : null}
          {closable ? (
            <Box
              plain
              flex={false}
              onClick={onClose}
              style={{
                position: 'absolute',
                right: size === 'small' ? '12px' : '6px',
                top: size === 'small' ? '12px' : '6px',
              }}
              height="24px"
            >
              <FormClose size="medium" color="status-error" />
            </Box>
          ) : null}
        </Box>
        {footnote ? (
          <Box
            background={highlight ? 'status-warning' : undefined}
            direction="row"
            pad="xxsmall"
            gap="small"
            align="center"
            justify="start"
          >
            {highlight ? <Alert size="small" color="black" /> : null}
            <Text
              size="xsmall"
              textAlign="center"
              alignSelf="center"
              wordBreak="break-all"
            >
              {footnote}
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

Fila.defaultProps = {
  background: undefined,
  onClick: () => {},
  children: undefined,
  highlight: false,
  footnote: undefined,
  visibleColumns: [],
  width: undefined,
};

Fila.propTypes = {
  background: PropTypes.string,
  onClick: PropTypes.func,
  highlight: PropTypes.bool,
  visibleColumns: PropTypes.array,
  footnote: PropTypes.element,
  children: PropTypes.array,
  width: PropTypes.number,
};

export default Fila;
