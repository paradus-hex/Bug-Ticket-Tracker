import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';

export default function ConfirmDeleteDialog({
  dialogOpen,
  dialogClose,
  entity,
  handleDeleteUser,
  ...props
}) {
  const handleOk = (event, reason) => {
    handleDeleteUser();
    dialogClose();
  };

  return (
    <Box>
      <Dialog disableEscapeKeyDown open={dialogOpen} onClose={dialogClose}>
        <DialogTitle>
          Are you sure you want to delete all instances of this {entity} ?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          {/* <Button onClick={handleOk} variant="contained" color='error' >Delete</Button>
          <Button onClick={dialogClose} variant="contained" color='info'>Cancel</Button> */}
          <Button onClick={handleOk} color='error' >Delete</Button>
          <Button onClick={dialogClose} color='info'>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
