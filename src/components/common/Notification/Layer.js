import React from 'react';
import PropTypes from 'prop-types';
import { Box, Layer, Button, Text } from 'grommet/es6';
import { FormClose, StatusGood, StatusCritical } from 'grommet-icons';

const NotificationLayer = props => {
  return (
    <Layer
      position="bottom-right"
      modal={false}
      margin={{ vertical: 'large', horizontal: 'small' }}
      onEsc={props.onClose}
      responsive={false}
      plain
    >
      <Box
        align="center"
        direction="row"
        gap="small"
        justify="between"
        round="medium"
        elevation="medium"
        pad={{ vertical: 'xsmall', horizontal: 'small' }}
        background={props.status}
      >
        <Box align="center" direction="row" gap="xsmall">
          {props.status === 'status-ok' && <StatusGood />}
          {props.status === 'status-error' && <StatusCritical />}
          <Text>{props.message}</Text>
        </Box>
        <Button icon={<FormClose />} onClick={props.onClose} plain />
      </Box>
    </Layer>
  );
};

NotificationLayer.defaultProps = {
  status: 'status-ok',
};

NotificationLayer.propTypes = {
  status: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default NotificationLayer;
