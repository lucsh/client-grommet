import React from 'react';
import PropTypes from 'prop-types';
import Vocabulario from '../../vocabulario';
import { Box, Layer, Button, Heading, Text } from 'grommet/es6';

const ConfirmLayer = ({ message, actionMessage, onClose, onConfirmAction }) => (
  <Layer position="center" modal onClickOutside={onClose} onEsc={onClose}>
    <Box pad="medium" gap="small" width="medium">
      <Heading level={3} margin="none">
        {Vocabulario.get('CONFIRMAR')}
      </Heading>
      <Text>{message}</Text>
      <Box
        as="footer"
        gap="small"
        direction="row"
        align="center"
        justify="end"
        pad={{ top: 'medium', bottom: 'small' }}
      >
        <Button label="Cancelar" onClick={onClose} color="dark-3" />
        <Button
          label={
            <Text color="white">
              <strong>{actionMessage}</strong>
            </Text>
          }
          onClick={onConfirmAction}
          primary
          color="status-critical"
        />
      </Box>
    </Box>
  </Layer>
);

ConfirmLayer.propTypes = {
  message: PropTypes.string.isRequired,
  actionMessage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmAction: PropTypes.func.isRequired,
};

export default ConfirmLayer;
