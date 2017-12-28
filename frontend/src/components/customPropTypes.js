import PropTypes from 'prop-types';

export const comment = PropTypes.shape({
  id: PropTypes.string,
  author: PropTypes.string,
  timestamp: PropTypes.number,
  body: PropTypes.string,
  voteScore: PropTypes.number,
});

export const post = PropTypes.shape({
  id: PropTypes.string,
  author: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  voteScore: PropTypes.number,
});

export const category = PropTypes.shape({
  name: PropTypes.string,
  path: PropTypes.string,
});

export const categories = PropTypes.arrayOf(category);
