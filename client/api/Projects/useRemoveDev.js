import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const removeDev = ({ projectId, user_id }) => {
  console.log({ user_id });
  return axios.delete(
    `http://localhost:8000/api/v1/projectassignments/${projectId}`,
    { data: { user_id } }
  );
};

const useRemoveDev = (projectId) => {
  const queryClient = useQueryClient();
  return useMutation(removeDev, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects-tickets', projectId]);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useRemoveDev;
