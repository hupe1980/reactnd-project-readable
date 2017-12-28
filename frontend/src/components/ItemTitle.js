import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';

import { Text } from './common';

const propTypes = {
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
};

const defaultProps = {
  category: null,
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TitleText = styled(Text)`
  font-weight: bold;
  font-size: 1em;
`;
const ItemTitle = ({ author, category }) => (
  <Container>
    <TitleText type="caption">{author}</TitleText>
    {category &&
      <Container>
        <PlayArrowIcon />
        <TitleText type="caption">{category}</TitleText>
      </Container>
    }
  </Container>
);

ItemTitle.propTypes = propTypes;
ItemTitle.defaultProps = defaultProps;

export default ItemTitle;
