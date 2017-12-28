import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';

import ItemTitle from './ItemTitle';
import ItemForm from './ItemForm';
import AdminMenu from './AdminMenu';
import UpDownVoter from './UpDownVoter';
import CommentCount from './CommentCount';
import { DateTimeText, Text, TextField, LetterAvatar } from './common';
import * as customPropTypes from './customPropTypes';

const propTypes = {
  isEditing: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hasDetailsButton: PropTypes.bool.isRequired,
  commentCount: PropTypes.number.isRequired,
  post: customPropTypes.post.isRequired,
};

const PostCard = styled(Card)`
  margin-top: 1em;
`;

const PostFooter = styled(CardActions)`
  justify-content: space-between;
`;

function Post(props) {
  const {
    post,
    commentCount,
    hasDetailsButton,
    onSubmit,
    onEdit,
    onVote,
    onCancel,
    onDelete,
    isEditing,
  } = props;

  const {
    id,
    category,
    voteScore,
    title,
    body,
    author,
    timestamp,
  } = post;

  return (
    <PostCard>
      <CardHeader
        avatar={<LetterAvatar text={author} />}
        action={
          <AdminMenu
            onDelete={() => onDelete(id)}
            onEdit={onEdit}
          />
          }
        title={<ItemTitle author={author} category={category} />}
        subheader={<DateTimeText timestamp={timestamp} />}
      />
      <CardContent>
        <ItemForm
          formId={`EditPost_${id}`}
          onSubmit={data => onSubmit(id, data)}
          onCancelClick={onCancel}
          initialValues={{ title, body }}
          isActive={isEditing}
          placeholder={
            <div>
              <Text type="title">{title}</Text>
              <Text multiline type="body1">{body}</Text>
            </div>
              }
        >
          <TextField
            placeholder="Enter title"
            name="title"
            fullWidth
            disableUnderline
            autoFocus
          />
          <TextField
            placeholder="Enter body"
            name="body"
            fullWidth
            multiline
            disableUnderline
          />
        </ItemForm>
      </CardContent>
      <PostFooter>
        <UpDownVoter
          onUp={() => onVote(id, 'upVote')}
          onDown={() => onVote(id, 'downVote')}
          score={voteScore}
        />
        {hasDetailsButton &&
        <Button component={Link} to={`/${category}/${id}`}>Details</Button>
          }
        <CommentCount count={commentCount} />
      </PostFooter>
    </PostCard>
  );
}

Post.propTypes = propTypes;

export default Post;
