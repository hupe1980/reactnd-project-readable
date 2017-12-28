import React from 'react';
import PropTypes from 'prop-types';
import Card, { CardContent } from 'material-ui/Card';

import { Text } from './common';

const propTypes = {
  text: PropTypes.string.isRequired,
};

function InfoText({ text }) {
  return (
    <Card>
      <CardContent>
        <Text align="center">{text}</Text>
      </CardContent>
    </Card>
  );
}

InfoText.propTypes = propTypes;

export default InfoText;
