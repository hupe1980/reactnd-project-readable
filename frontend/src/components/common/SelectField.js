import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';

const propTypes = {
  name: PropTypes.string.isRequired,
};

// eslint-disable-next-line react/prop-types
const renderSelectField = ({ input, meta: { touched, error }, ...custom }) =>
  (
    <FormControl error={Boolean(touched && error)}>
      <Select
        {...input}
        onChange={event => input.onChange(event.target.value)}
        {...custom}
      />
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );

function SelectField({ name, ...custom }) {
  return (
    <Field
      name={name}
      component={renderSelectField}
      {...custom}
    />
  );
}

SelectField.propTypes = propTypes;

export default SelectField;
