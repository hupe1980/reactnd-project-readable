import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Grid from 'material-ui/Grid';

import HeaderContainer from '../components/HeaderContainer';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const Content = styled.div`
  width: 100%;
  align-self: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
`;

function Default({ children }) {
  return (
    <Grid container spacing={0} justify="center">
      <HeaderContainer />
      <Content>
        {children}
      </Content>
    </Grid>
  );
}

Default.propTypes = propTypes;

export default Default;
