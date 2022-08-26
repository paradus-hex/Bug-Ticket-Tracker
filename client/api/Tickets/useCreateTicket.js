import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const createTicket = ({ projectId, createTicketPayload }) => {
  return axios.post(
    `http://localhost:8000/api/v1/tickets/${projectId}`,
    createTicketPayload
  );
};

const useCreateTicket = (projectID) => {
  const queryClient = useQueryClient();
  return useMutation(createTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects-tickets', projectID]);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useCreateTicket;
