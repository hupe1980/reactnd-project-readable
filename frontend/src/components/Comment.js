import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CardHeader, CardContent, CardActions } from 'material-ui/Card';

import ItemTitle from './ItemTitle';
import AdminMenu from './AdminMenu';
import UpDownVoter from './UpDownVoter';
import ItemForm from './ItemForm';
import { DateTimeText, Text, TextField, LetterAvatar } from './common';
import * as customPropTypes from './customPropTypes';

const propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onVote: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  comment: customPropTypes.comment.isRequired,
};

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

function Comment(props) {
  const {
    comment,
    onSubmit,
    onEdit,
    onVote,
    onCancel,
    onDelete,
    isEditing,
  } = props;

  const {
    id, author, timestamp, body, voteScore,
  } = comment;

  return (
    <Container>
      <CardHeader
        avatar={<LetterAvatar text={author} />}
        action={
          <AdminMenu
            onDelete={() => onDelete(comment)}
            onEdit={onEdit}
          />
          }
        title={<ItemTitle author={author} />}
        subheader={<DateTimeText timestamp={timestamp} />}
      />
      <CardContent>
        <ItemForm
          formId={`EditComment_${id}`}
          onSubmit={data => onSubmit(id, data)}
          onCancelClick={onCancel}
          initialValues={{ body }}
          isActive={isEditing}
          placeholder={
            <Text multiline type="body1">
              {body}
            </Text>
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
      </CardContent>
      <CardActions>
        <UpDownVoter
          onUp={() => onVote(id, 'upVote')}
          onDown={() => onVote(id, 'downVote')}
          score={voteScore}
        />
      </CardActions>
    </Container>
  );
}

Comment.propTypes = propTypes;

export default Comment;
