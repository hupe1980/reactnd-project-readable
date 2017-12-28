import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import ItemForm from './ItemForm';
import { TextField, SelectField } from './common';
import * as actions from '../actions';
import { getCategories } from '../reducers/categories';
import * as CustomPropTypes from './customPropTypes';

const propTypes = {
  createPost: PropTypes.func.isRequired,
  categories: CustomPropTypes.categories.isRequired,
};

const validate = (values) => {
  const errors = {};
  const requiredFields = [
    'title',
    'category',
  ];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });

  return errors;
};

class NewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formData) {
    this.props.createPost(formData);
    this.setState({ isAdding: false });
  }

  render() {
    const { isAdding } = this.state;
    const { categories } = this.props;

    return (
      <Card>
        <ItemForm
          formId="NewPost"
          onSubmit={data => this.handleFormSubmit(data)}
          onCancelClick={() => this.setState({ isAdding: false })}
          validate={validate}
          isActive={isAdding}
          placeholder={
            <FormControl>
              <Input
                placeholder="Write a new post..."
                fullWidth
                disableUnderline
                onClick={() => this.setState({ isAdding: true })}
              />
            </FormControl>
              }
        >
          <TextField
            placeholder="Enter title"
            name="title"
            fullWidth
            disableUnderline
            autoFocus
          />
          <SelectField
            name="category"
            fullWidth
            disableUnderline
            native
          >
            <option value="" disabled>Select a category</option>
            {categories.map(({ name }) => (
              <option key={name} value={name}>{name}</option>
                ))}
          </SelectField>
          <TextField
            placeholder="Enter body"
            name="body"
            fullWidth
            multiline
            disableUnderline
          />
        </ItemForm>
      </Card>
    );
  }
}

const mapStateToProps = state => ({ categories: getCategories(state) });

NewPost.propTypes = propTypes;

export default connect(mapStateToProps, actions)(NewPost);
