import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { useGetUser } from '../../../api/users/useGetUser';

const UserDashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('token');
    useEffect(() => {
      if (token !== null) {
        const decoded = jwt.verify(token, 'SOMEBigSecretWord');
        var userId = decoded.user;
        setCurrentUser(userId);
      }
    }, [token]);
  }
  const { isLoading, isError, data } = useGetUser(currentUser);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const { name, email, user_authority } = data?.data.user[0];
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 1000 }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            Welcome {name}!
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Email: {email}
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Role: {user_authority}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'>Share</Button>
          <Button size='small'>Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default UserDashboard;