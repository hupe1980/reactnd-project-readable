import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu, { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogTitle } from 'material-ui/Dialog';
import MoreVertIcon from 'material-ui-icons/MoreVert';

const propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const ITEM_HEIGHT = 48;

class AdminMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      isMenuOpen: false,
      isDialogOpen: false,
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleYesButtonClick = this.handleYesButtonClick.bind(this);
  }

  handleMenuOpen(event) {
    event.preventDefault();
    this.setState({ isMenuOpen: true, anchorEl: event.currentTarget });
  }

  handleMenuClose(event) {
    event.preventDefault();
    this.setState({ isMenuOpen: false });
  }

  handleItemClick(action, event) {
    event.preventDefault();

    switch (action) {
      case 'DELETE':
        this.setState({
          isDialogOpen: true,
        });
        break;
      case 'EDIT':
        this.props.onEdit();
        break;
      default:
        throw Error('Unknown action key!');
    }

    this.handleMenuClose(event);
  }

  handleDialogClose(event) {
    event.preventDefault();
    this.setState({ isDialogOpen: false });
  }

  handleYesButtonClick(event) {
    event.preventDefault();
    this.props.onDelete();
    this.handleDialogClose(event);
  }

  render() {
    const { anchorEl, isMenuOpen, isDialogOpen } = this.state;

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="admin-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={event => this.handleMenuClose(event)}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5, width: 100,
            },
          }}
        >
          <MenuItem onClick={event => this.handleItemClick('EDIT', event)}>Edit</MenuItem>
          <MenuItem onClick={event => this.handleItemClick('DELETE', event)}>Delete</MenuItem>
        </Menu>
        <Dialog open={isDialogOpen} onClose={event => this.handleDialogClose(event)}>
          <DialogTitle >Are you sure you want to delete this item?</DialogTitle>
          <DialogActions>
            <Button onClick={event => this.handleDialogClose(event)} color="primary">
              Cancel
            </Button>
            <Button onClick={event => this.handleYesButtonClick(event)} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

AdminMenu.propTypes = propTypes;

export default AdminMenu;
