import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { randomId } from '@mui/x-data-grid-generator';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import * as React from 'react';
import { DialogContext } from './DialogComponent';

export default function CreateTicketForm({ handleCreateTicket, ...props }) {
  const { handleClose } = React.useContext(DialogContext);

  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [value, setValue] = React.useState(dayjs());
  const router = useRouter();
  const { projectId } = router.query;
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('token');
    React.useEffect(() => {
      if (token !== null) {
        const decoded = jwt.verify(token, 'SOMEBigSecretWord');
        var userId = decoded.user;
        setCurrentUser(userId);
      }
    }, [token]);
  }

  const handleDateChange = (newValue) => {
    setValue(newValue);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    const ticket_id = randomId().substring(0, 4);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const yyyy = value.get('year');
    const mm = value.get('month') + 1;
    const dd = value.get('date');
    const formattedDate = `${mm}-${dd}-${yyyy}`;
    const createTicketPayload = {
      ticket_id,
      title: data.get('title'),
      description: data.get('description'),
      status,
      author_id: currentUser,
      created_at: formattedDate
    };
    handleCreateTicket({ projectId, createTicketPayload });
    handleClose();
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box component='form' noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='title'
                label='Title'
                name='title'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={6}
                name='description'
                label='Description'
                type='description'
                id='description'
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-helper-label'>
                  status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={status}
                  label='status'
                  onChange={handleStatusChange}
                >
                  <MenuItem value='Pending'>Pending</MenuItem>
                  <MenuItem value='Inprogress'>Inprogress</MenuItem>
                  <MenuItem value='Resolved'>Resolved</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label='Date desktop'
                  inputFormat='MM/DD/YYYY'
                  value={value}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Ticket
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
