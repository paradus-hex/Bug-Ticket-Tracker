import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getTicket = (ticketID) => {
  return axios.get(`https://api.bugtracker.click/api/v1/tickets/${ticketID}`);
};

export const useGetTicket = (ticketID) => {
  return useQuery(['get-current-ticket', ticketID], () => getTicket(ticketID), {
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};
