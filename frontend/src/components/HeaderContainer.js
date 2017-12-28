import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import NavBar from './NavBar';
import LoginDialog from './LoginDialog';
import * as actions from '../actions';
import { getCategories } from '../reducers/categories';
import { getIsLoggedIn } from '../reducers/auth';
import * as customPropTypes from './customPropTypes';

const propTypes = {
  fetchCategories: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  categories: customPropTypes.categories.isRequired,
};

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginOpen: false,
    };

    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  handleClickLogin() {
    this.setState({ isLoginOpen: true });
  }

  handleClose() {
    this.setState({ isLoginOpen: false });
  }

  handleSubmit({ username }) {
    this.props.login(username);
    this.handleClose();
  }

  render() {
    const { isLoginOpen } = this.state;
    const { categories, isLoggedIn, logout } = this.props;

    return (
      <div>
        <NavBar
          categories={categories}
          isLoggedIn={isLoggedIn}
          onLogin={this.handleClickLogin}
          onLogout={logout}
        />
        <LoginDialog
          isOpen={isLoginOpen}
          onSubmit={this.handleSubmit}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: getCategories(state),
  isLoggedIn: getIsLoggedIn(state),
});

Header.propTypes = propTypes;

export default withRouter(connect(mapStateToProps, actions)(Header));
