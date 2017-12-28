import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';

import { Text } from './common';

const propTypes = {
  score: PropTypes.number.isRequired,
  onUp: PropTypes.func.isRequired,
  onDown: PropTypes.func.isRequired,
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

function UpDownVoter({ score, onUp, onDown }) {
  const handleClick = (action) => {
    if (action === 'up') return onUp();
    return onDown();
  };

  return (
    <Container>
      <IconButton onClick={() => handleClick('up')}>
        <ThumbUpIcon />
      </IconButton>
      <Text type="caption">{score}</Text>
      <IconButton onClick={() => handleClick('down')}>
        <ThumbDownIcon />
      </IconButton>
    </Container>
  );
}

UpDownVoter.propTypes = propTypes;

export default UpDownVoter;
