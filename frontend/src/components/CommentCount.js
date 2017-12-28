import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModeCommentIcon from 'material-ui-icons/ModeComment';

import { Text } from './common';

const propTypes = {
  count: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const CommentIcon = styled(ModeCommentIcon)`
  margin-left: 0.5em;
  margin-right: 0.5em;
  color: gray;
`;


function CommentCount({ count }) {
  return (
    <Container>
      <Text type="caption">{count}</Text>
      <CommentIcon />
    </Container>
  );
}

CommentCount.propTypes = propTypes;

export default CommentCount;
