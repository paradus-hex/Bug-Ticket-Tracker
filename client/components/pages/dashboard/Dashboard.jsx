import { Box, Card, CardContent, Typography } from '@mui/material';
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
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '40px',
          paddingTop: '40px'
        }}
      >
        <Card
          sx={{
            // backgroundColor: "gray",
            // border: "1px solid",
            maxWidth: 1000,
            paddingLeft: '45px',
            paddingRight: '45px',
            borderRadius: 4,
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.5)',
            '&:hover': {
              boxShadow: '0 16px 40px -12.125px rgba(0, 138, 255, 0.72)'
            }
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant='h4'
              fontFamily={'Monospace'}
              fontWeight='bold'
            >
              Welcome {name}!
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              fontFamily={'Monospace'}
            >
              Email: {email}
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              fontFamily={'Monospace'}
            >
              Role: {user_authority}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserDashboard;
