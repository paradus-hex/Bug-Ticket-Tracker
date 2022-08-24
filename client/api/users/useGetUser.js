import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getUser = (userID) => {
  return axios.get(`http://localhost:8000/api/v1/users/${userID}`);
};

export const useGetUser = (userID) => {
  return useQuery(['get-current-user', userID], () => getUser(userID), {
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};
