import React from 'react';
import { Text } from 'grommet';
import TextTooltip from './TextTooltip';
import PropTypes from 'prop-types';

const ColloredBullet = ({ color, description }) => (
  <TextTooltip
    size="small"
    content={
      <Text color={color} size="xxlarge" pad="small">
        &bull;
      </Text>
    }
    tooltip={description}
  />
);

ColloredBullet.defaultProps = {
  color: 'status-error',
  description: '',
};

ColloredBullet.propTypes = {
  color: PropTypes.string,
  description: PropTypes.string,
};
export default ColloredBullet;
