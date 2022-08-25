import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const updateTicket = ({
  project_id,
  ticket_id,
  title,
  description,
  status,
  date
}) => {
  return axios.put(
    `http://localhost:8000/api/v1/tickets/${project_id}/${ticket_id}`,
    {
      title,
      description,
      status,
      date
    },
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

const useUpdateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation(updateTicket, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-tickets']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useUpdateTicket;
