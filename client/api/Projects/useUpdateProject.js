import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const updateProject = ({ project_id, name, description }) => {
  return axios.put(
    `http://localhost:8000/api/v1/projects/${project_id}`,
    {
      name,
      description
    },
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(updateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-projects']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useUpdateProject;
