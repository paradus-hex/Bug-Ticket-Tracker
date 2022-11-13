import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const deleteProject = (ProjectID) => {
  return axios.delete(
    `https://api.bugtracker.click/api/v1/projects/${ProjectID}`,
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useDeleteProject;
