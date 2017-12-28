import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'material-ui/Typography';

const propTypes = {
  multiline: PropTypes.bool,
};

const defaultProps = {
  multiline: false,
};

const Text = styled(({ multiline, ...rest }) => (
  <Typography {...rest} />
))`
  ${props => props.multiline && 'white-space: pre-line;'}
`;

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
