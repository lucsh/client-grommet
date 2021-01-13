import React, { useState } from 'react';
import {
  Box,
  Button,
  Keyboard,
  Text,
  Calendar,
  MaskedInput,
  DropButton,
  ResponsiveContext,
} from 'grommet';
import { FormNext, FormPrevious, Schedule } from 'grommet-icons';
import PropTypes from 'prop-types';

/*
 * DateTime responsive
 *
 *  Usage:
 *         <DateTime
 *            initDate="2018-10-25"
 *            initTime="10:50"
 *            placeholder="Seleccionar fecha y hora"
 *            size="small"
 *         />
 */

const DropContent = ({
  date: initialDate,
  time: initialTime,
  onClose,
  size,
}) => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  const close = () => onClose(date || initialDate, time || initialTime);
  const screenSize = React.useContext(ResponsiveContext);

  let calendarSize = 'small';
  if (screenSize !== 'small') {
    calendarSize = size;
  }
  return (
    <Box direction="column" pad="medium">
      <Box justify="between" direction="row-responsive" align="start">
        <Box
          align="center"
          pad={{ vertical: 'small', horizontal: 'large' }}
          border={
            screenSize !== 'small'
              ? { color: 'lightgray', side: 'right', size: 'xsmall' }
              : false
          }
        >
          <Calendar
            size={calendarSize}
            firstDayOfWeek={1}
            daysOfWeek
            locale="es-AR"
            header={({
              date: currentDate,
              locale,
              onPreviousMonth,
              onNextMonth,
              previousInBound,
              nextInBound,
            }) => (
              <Box
                direction="row"
                align="center"
                justify="between"
                margin="small"
              >
                <Button disabled={!previousInBound} onClick={onPreviousMonth}>
                  <Box>
                    <FormPrevious />
                  </Box>
                </Button>
                <Text size="small" style={{ textTransform: 'uppercase' }}>
                  <strong>
                    {currentDate.toLocaleDateString(locale, {
                      month: 'long',
                    })}
                  </strong>{' '}
                  <span>
                    {currentDate.toLocaleDateString(locale, {
                      year: 'numeric',
                    })}
                  </span>
                </Text>
                <Button disabled={!nextInBound} onClick={onNextMonth}>
                  <Box>
                    <FormNext />
                  </Box>
                </Button>
              </Box>
            )}
            animate
            date={date || initialDate}
            onSelect={setDate}
            showAdjacentDays
          />
        </Box>
        <Box flex={false} pad="medium" gap="medium">
          <Text size="small" style={{ textTransform: 'uppercase' }}>
            <strong>Hora:</strong>
          </Text>
          <Keyboard
            onEnter={event => {
              event.preventDefault(); // so drop doesn't re-open
              close();
            }}
          >
            <MaskedInput
              size="small"
              mask={[
                {
                  length: [1, 2],
                  options: [
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                    '10',
                    '11',
                    '12',
                  ],
                  regexp: /^1[1-2]$|^[0-9]$/,
                  placeholder: 'hh',
                },
                { fixed: ':' },
                {
                  length: 2,
                  options: ['00', '15', '30', '45'],
                  regexp: /^[0-5][0-9]$|^[0-9]$/,
                  placeholder: 'mm',
                },
                { fixed: ' ' },
                {
                  length: 2,
                  options: ['am', 'pm'],
                  regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                  placeholder: 'ap',
                },
              ]}
              value={time || initialTime}
              name="maskedInput"
              onChange={event => setTime(event.target.value)}
            />
          </Keyboard>
        </Box>
      </Box>
      <Box flex={false} margin={{ left: 'auto' }}>
        <Button label="Aceptar" onClick={close} />
      </Box>
    </Box>
  );
};

const DateTime = ({ initDate, initTime, placeholder, size }) => {
  const [date, setDate] = useState(initDate);
  const [time, setTime] = useState(initTime);
  const [open, setOpen] = useState(true);

  const onClose = (nextDate, nextTime) => {
    setDate(nextDate);
    setTime(nextTime);
    setOpen(false);
    setTimeout(() => setOpen(undefined), 1);
  };

  return (
    <Box align="start" pad="large" justify="between">
      <DropButton
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        dropContent={
          <DropContent date={date} time={time} onClose={onClose} size={size} />
        }
      >
        <Box direction="row" gap="medium" align="center" pad="small">
          <Text color={date ? undefined : 'dark-5'}>
            {date
              ? `${new Date(date).toLocaleDateString()} ${time}`
              : placeholder}
          </Text>
          <Schedule />
        </Box>
      </DropButton>
    </Box>
  );
};

DateTime.defaultProps = {
  initDate: '',
  initDates: '',
  initTime: '',
  placeholder: 'Seleccionar fecha y hora',
  size: 'medium',
};

DateTime.propTypes = {
  initDate: PropTypes.string,
  initDates: PropTypes.arrayOf(PropTypes.string),
  initTime: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium']),
};
export default DateTime;
