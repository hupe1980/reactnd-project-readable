import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Avatar from 'material-ui/Avatar';

const propTypes = {
  num: PropTypes.number,
  text: PropTypes.string,
};

const defaultProps = {
  num: 1,
  text: '?',
};

function calculateColor({ text }) {
  const numValue = text.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0); // a -> 0; z -> 25

  if (numValue < 9) {
    return css`
      background-color: #3F51B5;
      color: white;
    `;
  } else if (numValue >= 9 && numValue < 18) {
    return css`
      background-color: #FF4081;
      color: white;
    `;
  }
  return css`
      background-color: #00AA8D;
      color: white;
    `;
}

function format(text, num) {
  return text.toUpperCase().substring(0, num);
}

const LetterAvatar = styled(({ text, num, ...rest }) => (
  <Avatar {...rest}>{format(text, num)}</Avatar>
))`
  ${calculateColor}
`;

LetterAvatar.propTypes = propTypes;
LetterAvatar.defaultProps = defaultProps;

export default LetterAvatar;
