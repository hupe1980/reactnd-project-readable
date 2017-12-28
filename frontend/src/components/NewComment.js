import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

import ItemForm from './ItemForm';
import { TextField } from './common';
import * as actions from '../actions';

const propTypes = {
  parentId: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired,
};

class NewComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({ body }) {
    const { parentId } = this.props;

    this.props.createComment({
      body,
      parentId,
    });
    this.setState({ isAdding: false });
  }

  render() {
    const { isAdding } = this.state;

    return (
      <Card>
        <ItemForm
          formId="NewComment"
          onSubmit={data => this.handleFormSubmit(data)}
          onCancelClick={() => this.setState({ isAdding: false })}
          isActive={isAdding}
          placeholder={
            <FormControl>
              <Input
                placeholder="Write a comment..."
                fullWidth
                disableUnderline
                onClick={() => this.setState({ isAdding: true })}
              />
            </FormControl>
              }
        >
          <TextField
            placeholder="Enter body"
            name="body"
            fullWidth
            multiline
            disableUnderline
            autoFocus
          />
        </ItemForm>
      </Card>
    );
  }
}

NewComment.propTypes = propTypes;

export default connect(null, actions)(NewComment);
