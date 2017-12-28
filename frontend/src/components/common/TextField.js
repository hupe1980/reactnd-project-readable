import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

const propTypes = {
  name: PropTypes.string.isRequired,
};

// eslint-disable-next-line react/prop-types
const renderTextField = ({ input, meta: { touched, error }, ...custom }) => (
  <FormControl error={Boolean(touched && error)}>
    <Input {...input} {...custom} />
    {touched && error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);

function TextField({ name, ...custom }) {
  return (
    <Field
      name={name}
      component={renderTextField}
      {...custom}
    />
  );
}

TextField.propTypes = propTypes;

export default TextField;
