import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const createProject = (createProjectPayload) => {
  return axios.post(
    `http://localhost:8000/api/v1/projects`,
    createProjectPayload,
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation(createProject, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries(['create-project']);
      queryClient.setQueryData(['get-projects'], (old) => {
        return {
          ...old,
          data: [...old.data, data.data]
        };
      });
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useCreateProject;
