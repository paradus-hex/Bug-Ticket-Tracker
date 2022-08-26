import { Box, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useGetTicket } from '../../../api/Tickets/useGetTicket';

const DisplayTicket = () => {
  const router = useRouter();
  const { ticketId } = router.query;
  const { isLoading, isError, data } = useGetTicket(ticketId);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const {
    ticket_id,
    title,
    user_authority,
    description,
    email,
    name,
    status,
    project_id,
    created_at
  } = data?.data[0];
  console.log(ticket_id, title, data);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            maxWidth: 1000,
            borderRadius: 4,
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.5)',
            '&:hover': {
              boxShadow: '0 16px 40px -12.125px rgba(0, 138, 255, 0.72)'
            }
          }}
        >
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Ticket Title: {title}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Description: {description}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Submitted By: {name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              User Email: {email}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Created on: {created_at}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Status: {status}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              User Authority: {user_authority}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DisplayTicket;
