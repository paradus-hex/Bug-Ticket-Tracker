import { Box } from '@mui/material';
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

  const { ticket_id, title, user_authority } = data?.data[0];
  console.log(ticket_id, title, data);
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* <Card sx={{ maxWidth: 1000 }}>
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Ticket Title: {name}!
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Email: {email}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Role: {user_authority}
            </Typography>
          </CardContent>
        </Card> */}
      </Box>
    </>
  );
};

export default DisplayTicket;
