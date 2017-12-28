import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

import * as customPropTypes from './customPropTypes';

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  categories: customPropTypes.categories.isRequired,
};

const AuthContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content:flex-end;
`;

function NavBar({
  categories, isLoggedIn, onLogin, onLogout,
}) {
  return (
    <AppBar>
      <Toolbar>
        <Button
          color="contrast"
          component={NavLink}
          activeStyle={{
            color: '#ff4081',
          }}
          to="/"
        >
          Readable
        </Button>
        {categories.map(({ name, path }) => (
          <Button
            color="contrast"
            key={path}
            component={NavLink}
            activeStyle={{
              textDecoration: 'none',
              color: '#ff4081',
            }}
            to={`/${path}`}
          >
            {name}
          </Button>
        ))}
        <AuthContainer>
          {isLoggedIn ?
            <Button
              color="contrast"
              onClick={onLogout}
            >
            Logout
            </Button>
          :
            <Button
              color="contrast"
              onClick={onLogin}
            >
            Login
            </Button>
          }
        </AuthContainer>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = propTypes;

export default NavBar;
