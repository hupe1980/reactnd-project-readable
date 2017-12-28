import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Default from '../layouts/Default';
import PostContainer from '../components/PostContainer';
import * as actions from '../actions';

const propTypes = {
  fetchPost: PropTypes.func.isRequired,
  fetchPostComments: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

const BackButton = styled(Button)`
  align-self: center;
  margin-top: 6px;
`;

class PostDetails extends Component {
  componentDidMount() {
    const {
      postId,
      fetchPost,
      fetchPostComments,
    } = this.props;

    fetchPost(postId);
    fetchPostComments(postId);
  }

  render() {
    const { postId, history } = this.props;

    return (
      <Default>
        <BackButton onClick={history.goBack}>Back</BackButton>
        <PostContainer postId={postId} />
      </Default>
    );
  }
}

PostDetails.propTypes = propTypes;

export default withRouter(connect(null, actions)(PostDetails));
