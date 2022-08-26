import { Box, Card, CardContent, Typography } from '@mui/material';
import jwt from 'jsonwebtoken';
import React, { useEffect, useState } from 'react';
import { useGetUser } from '../../../api/users/useGetUser';
import Copyright from '../../common/Copyright';

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
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Welcome {name}!
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Email: {email}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Role: {user_authority}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Copyright />
    </>
  );
};

export default UserDashboard;
