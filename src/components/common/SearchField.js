import React from 'react';
import { Box, TextInput } from 'grommet';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Search as SearchIcon } from 'grommet-icons';
import LoadingIcon from './LoadingIcon';

/**
 * Search Field
 *
 * @param onChange
 * @param placeholder
 * @param round
 */

const SearchInput = styled(TextInput)`
  border: none;
  padding-left: 40px;
`;

const SearchIconStyled = styled(SearchIcon)`
  height: ${props => props.size};
  width: ${props => props.size};
  position: absolute;
  margin-left: 5px;
`;

const LoadingIconStyled = styled(LoadingIcon)`
  right: 0;
  position: absolute;
`;

const Container = styled(Box)`
  border: 1px solid grey !important;
  position: relative;
`;

function SearchField({ onChange, placeholder, round, loading, size }) {
  const [value, setValue] = React.useState('');

  const onChangeInput = event => {
    const value = event.target.value;
    setValue(value);
    // respeto la forma del objeto
    onChange({ target: { value } });
  };

  const sizes = {
    xsmall: '12px',
    small: '16px',
    medium: '24px',
  };

  return (
    <Container round={round} direction="row" align="center" elevation="small">
      <SearchIconStyled color="muted" size={sizes[size]} />
      <SearchInput
        size={size}
        focusIndicator={false}
        placeholder={placeholder}
        value={value}
        onChange={onChangeInput}
      />
      {loading && <LoadingIconStyled color="muted" size={sizes[size]} />}
    </Container>
  );
}

SearchField.defaultProps = {
  onChange: () => {},
  placeholder: 'Buscar',
  round: 'xsmall',
  loading: false,
  size: 'medium',
};

SearchField.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  round: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.string,
};

export default SearchField;
