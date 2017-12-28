import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import styled from 'styled-components';
import { CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  submitButtonText: PropTypes.string,
};

const defaultProps = {
  submitButtonText: 'Save',
};

const FormButtons = styled(CardActions)`
  justify-content: flex-end;
`;

class SimpleForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
  }

  handleFormSubmit(formData) {
    this.props.onSubmit(formData);
  }

  handleCancelClick() {
    this.props.reset();
    this.props.onCancelClick();
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      children,
      submitButtonText,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} noValidate autoComplete="off">
        {children}
        <FormButtons>
          <Button onClick={this.handleCancelClick}>Cancel</Button>
          <Button type="submit" disabled={pristine || submitting}>{submitButtonText}</Button>
        </FormButtons>
      </form>
    );
  }
}

SimpleForm.propTypes = propTypes;
SimpleForm.defaultProps = defaultProps;

export default compose(
  connect((state, props) => ({
    form: props.formId,
    validate: props.validate,
    initialValues: props.initialValues,
  })),
  reduxForm(),
)(SimpleForm);
