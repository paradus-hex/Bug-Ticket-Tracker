import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { randomId } from '@mui/x-data-grid-generator';
import * as React from 'react';
import { DialogContext } from './DialogComponent';

export default function createProjectForm({ handleCreateProject, ...props }) {
  const { handleClose } = React.useContext(DialogContext);
  const handleSubmit = (event) => {
    const project_id = randomId().substring(0, 3);

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('name'),
    //   password: data.get('description')
    // });
    const createProjectPayload = {
      project_id,
      name: data.get('name'),
      description: data.get('description')
    };
    handleCreateProject(createProjectPayload);
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
                id='name'
                label='Name'
                name='name'
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
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
