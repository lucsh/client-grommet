import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

const StepperActions = ({ next, step, previous, handleOpen, isLastPage }) => (
  <Box
    flex
    align="end"
    justify="between"
    direction="row"
    margin={{ top: 'medium' }}
  >
    <Button onClick={handleOpen} label="Cancelar" justify="start" />
    <Box justify="end" direction="row-responsive" gap="small">
      {step > 0 && <Button onClick={previous} label="Atras" justify="start" />}
      {isLastPage ? (
        <Button type="button" onClick={next} label="Guardar" justify="end" />
      ) : (
        <Button type="button" onClick={next} label="Siguiente" justify="end" />
      )}
    </Box>
  </Box>
);

StepperActions.propTypes = {
  next: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  previous: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  isLastPage: PropTypes.bool.isRequired,
};

export default StepperActions;
