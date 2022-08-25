import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const deleteProject = (ProjectId) => {
  return axios.delete(`http://localhost:8000/api/v1/projects/${projectId}`, {
    headers: {
      token: localStorage.getItem('token')
    }
  });
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-Projects']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useDeleteProject;
