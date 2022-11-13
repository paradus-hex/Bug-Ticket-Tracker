import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getAllUsers = () => {
  return axios.get('https://api.bugtracker.click/api/v1/users');
};

export const useGetAllUsers = (onSuccess) => {
  return useQuery(['get-users'], getAllUsers, {
    onSuccess,
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};
