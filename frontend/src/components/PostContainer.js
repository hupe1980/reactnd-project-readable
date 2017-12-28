import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CircularProgress } from 'material-ui/Progress';
import { CardContent } from 'material-ui/Card';

import Post from './Post';
import InfoText from './InfoText';
import CommentContainer from '../components/CommentContainer';
import NewComment from '../components/NewComment';
import * as actions from '../actions';
import { getPostById, getIsFetching } from '../reducers/posts';
import { getCommentIds } from '../reducers/comments';
import * as customPropTypes from './customPropTypes';

const propTypes = {
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired,
  hasDetailsButton: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
  postId: PropTypes.string.isRequired,
  commentIds: PropTypes.arrayOf(PropTypes.string),
  post: customPropTypes.post,
};

const defaultProps = {
  hasDetailsButton: false,
  commentIds: null,
  post: null,
};

const List = styled(CardContent)`
  margin-left: 1em;
  padding: 0;
`;

class PostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(id, { title, body }) {
    this.props.updatePost(id, {
      title,
      body,
    });
    this.setState({ isEditing: false });
  }

  renderCommentsArea() {
    const { postId, commentIds } = this.props;
    return (
      <div>
        <NewComment parentId={postId} />
        {commentIds.length !== 0 &&
          <List>
            {commentIds.map(id => (
              <CommentContainer key={id} commentId={id} />
            ))}
          </List>
        }
      </div>
    );
  }

  render() {
    const { isEditing } = this.state;
    const {
      post,
      commentIds,
      hasDetailsButton,
      isFetching,
      deletePost,
      votePost,
    } = this.props;

    if (isFetching) return <CircularProgress />;

    if (!post) return <InfoText text="Post not found!!!" />;

    if (post.deleted) return <InfoText text={`Post ${post.title} was successfully deleted!`} />;

    return (
      <div>
        <Post
          post={post}
          commentCount={commentIds.length || post.commentCount}
          isEditing={isEditing}
          hasDetailsButton={hasDetailsButton}
          onSubmit={this.handleFormSubmit}
          onEdit={() => this.setState({ isEditing: true })}
          onCancel={() => this.setState({ isEditing: false })}
          onVote={votePost}
          onDelete={deletePost}
        />
        {!hasDetailsButton && this.renderCommentsArea()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  post: getPostById(state, ownProps.postId),
  commentIds: getCommentIds(state),
  isFetching: getIsFetching(state),
});

PostContainer.propTypes = propTypes;
PostContainer.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(PostContainer);
