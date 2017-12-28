import React from 'react';
import PropTypes from 'prop-types';

import Text from './Text';

const propTypes = {
  timestamp: PropTypes.number.isRequired,
};

function format(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

function DateTimeText({ timestamp, ...rest }) {
  return (
    <Text {...rest}>{format(timestamp)}</Text>
  );
}

DateTimeText.propTypes = propTypes;

export default DateTimeText;
