import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getAllProjects = () => {
  return axios.get('https://api.bugtracker.click/api/v1/projects');
};

export const useGetAllProjects = (onSuccess) => {
  return useQuery(['get-projects'], getAllProjects, {
    onSuccess,
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};
