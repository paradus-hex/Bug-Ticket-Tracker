import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import useLoginUser from '../../../api/users/useLoginUser';

export default function LoginForm() {
  const router = useRouter();
  const [isError, setIsError] = React.useState(false);
  const [msgError, setMsgError] = React.useState(null);

  const onSuccess = (successData) => {
    // console.log(successData.data);
    setIsError(false);
    setShowSnackbar(true);
    localStorage.setItem('token', successData.data.token);
    localStorage.setItem('auth', successData.data.auth);
    router.push('/dashboard');
  };
  const onError = (error) => {
    console.log(error.response.data);
    setIsError(true);
    setMsgError(error.response.data);
  };
  const { mutate: loginUser } = useLoginUser(onSuccess, onError);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginUserPayload = {
      email: data.get('email'),
      password: data.get('password')
    };
    loginUser(loginUserPayload);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={isError}
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={isError}
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          <Button
            disabled={isError}
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent='center'>
            <Grid item>
              <Link href='/register'>
                <Typography
                  variant='subtitle2'
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      color: '#CE93D8'
                    }
                  }}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
        {isError && msgError && (
          <Alert severity='error' sx={{ marginTop: 5 }} variant='filled'>
            {msgError}
          </Alert>
        )}
      </Box>
    </Container>
  );
}
