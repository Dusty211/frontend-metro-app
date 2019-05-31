import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class StillThere extends React.Component {


  render() {
    return (
      <div>
        <Dialog
          open={this.props.dialogOpen}
          onClose={this.props.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you still there?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              It looks like you may be away, so we have suspended arrivals updates until you are back.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.imBack} color="primary">
              I'm back!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default StillThere;
