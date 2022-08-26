import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getTicket = (ticketID) => {
  return axios.get(`http://localhost:8000/api/v1/tickets/${ticketID}`);
};

export const useGetTicket = (ticketID) => {
  return useQuery(['get-current-ticket', ticketID], () => getTicket(ticketID), {
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};
