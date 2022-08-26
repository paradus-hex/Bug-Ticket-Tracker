import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import * as React from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
export default function DialogSelect(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const router = useRouter();
  const { projectId } = router.query;

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
    console.log(personName);
  };

  const handleOk = (event, reason) => {
    const {
      target: { value }
    } = event;
    if (reason !== 'backdropClick') {
      setOpen(false);
      console.log({ projectId, devs_to_assign: personName });
      props.handleAssignDevs({ projectId, devs_to_assign: personName });
    }
  };

  return (
    <Box>
      <Button onClick={handleClickOpen}>Assign More Developers</Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Available Developers</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id='demo-multiple-chip-label'>Devs</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple
              value={personName}
              onChange={handleChange}
              input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {props.users.map((user) => (
                <MenuItem
                  key={user.user_id}
                  value={user.user_id}
                  style={getStyles(user.name, personName, theme)}
                >
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
          <Button onClick={handleOk} color='info'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
