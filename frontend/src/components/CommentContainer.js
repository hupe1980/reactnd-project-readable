import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Comment from './Comment';
import * as actions from '../actions';
import { getCommentById } from '../reducers/comments';
import * as customPropTypes from './customPropTypes';

const propTypes = {
  updateComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired,
  comment: customPropTypes.comment.isRequired,
};

class CommentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(id, { body }) {
    this.props.updateComment(id, {
      body,
    });
    this.setState({ isEditing: false });
  }

  render() {
    const { isEditing } = this.state;
    const { comment, deleteComment, voteComment } = this.props;

    return (
      <Comment
        comment={comment}
        isEditing={isEditing}
        onSubmit={this.handleFormSubmit}
        onEdit={() => this.setState({ isEditing: true })}
        onCancel={() => this.setState({ isEditing: false })}
        onVote={voteComment}
        onDelete={deleteComment}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  comment: getCommentById(state, ownProps.commentId),
});

CommentContainer.propTypes = propTypes;

export default connect(mapStateToProps, actions)(CommentContainer);
