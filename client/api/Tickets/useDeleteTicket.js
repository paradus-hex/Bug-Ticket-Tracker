import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const deleteTicket = ({ projectId, ticket_id }) => {
  return axios.delete(`http://localhost:8000/api/v1/tickets/${projectId}`, {
    data: { ticket_id }
  });
};

const useDeleteTicket = (projectID) => {
  const queryClient = useQueryClient();
  return useMutation(deleteTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects-tickets', projectID]);
      console.log(
        queryClient.invalidateQueries(['get-projects-tickets', projectID])
      );
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useDeleteTicket;
