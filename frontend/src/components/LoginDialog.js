import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';

import { SimpleForm, TextField } from './common';

const propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function LoginDialog({ onSubmit, onClose, isOpen }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <SimpleForm
          formId="LoginForm"
          onSubmit={data => onSubmit(data)}
          onCancelClick={onClose}
        >
          <TextField
            placeholder="Enter username"
            name="username"
            fullWidth
            autoFocus
          />
        </SimpleForm>
      </DialogContent>
    </Dialog>
  );
}

LoginDialog.propTypes = propTypes;

export default LoginDialog;
