import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import * as React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const DialogContext = React.createContext({
  open: false,
  setOpen: () => {}
});

export default function DialogComponent({
  title,
  buttonTitle,
  children,
  ...props
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleClickOpen} startIcon={<AddIcon />}>
        {buttonTitle}
      </Button>
      <DialogContext.Provider value={{ handleClose }}>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
            <DialogTitle>{title}</DialogTitle>
          </Box>
          <DialogContent>
            <FormControl sx={{ m: 1, maxWidth: 500 }}>{children}</FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </DialogContext.Provider>
    </Box>
  );
}
