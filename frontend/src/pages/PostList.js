import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Default from '../layouts/Default';
import PostContainer from '../components/PostContainer';
import Sorter from '../components/Sorter';
import NewPost from '../components/NewPost';

import * as actions from '../actions';
import { getSortBy, getSortedPostIds } from '../reducers/posts';

const propTypes = {
  sortPosts: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  sortBy: PropTypes.oneOf(['date', 'vote']).isRequired,
  sortedPostIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  category: PropTypes.string,
};

const defaultProps = {
  category: null,
};

class PostList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.fetchData();
    }
  }

  fetchData() {
    const { category, fetchPosts } = this.props;
    fetchPosts(category);
  }

  render() {
    const { sortedPostIds, sortBy, sortPosts } = this.props;

    return (
      <Default>
        <Sorter sortBy={sortBy} onClick={sortPosts} />
        <NewPost />
        {sortedPostIds.map(id => (
          <PostContainer key={id} postId={id} hasDetailsButton />
        ))}
      </Default>
    );
  }
}

function mapStateToProps(state) {
  return {
    sortBy: getSortBy(state),
    sortedPostIds: getSortedPostIds(state),
  };
}

PostList.propTypes = propTypes;
PostList.defaultProps = defaultProps;

export default connect(mapStateToProps, actions)(PostList);
