import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const createTicket = ({ projectId, createTicketPayload }) => {
  return axios.post(
    `http://localhost:8000/api/v1/projects/${projectId}`,
    createTicketPayload
  );
};

const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation(createTicket, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['get-tickets']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useCreateTicket;
