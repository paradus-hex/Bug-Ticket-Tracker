import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const assignDevs = ({ projectId, devs_to_assign }) => {
  return axios.post(
    `http://localhost:8000/api/v1/projectassignments/${projectId}`,
    { devs_to_assign }
  );
};

const useAssignDevs = (projectID) => {
  const queryClient = useQueryClient();
  return useMutation(assignDevs, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects-tickets', projectID]);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useAssignDevs;
