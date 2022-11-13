import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const loginUser = (loginPayload) => {
  console.log('here');
  return axios.post('https://api.bugtracker.click/api/v1/login', loginPayload);
};

const useLoginUser = (onSuccess, onError) => {
  return useMutation(loginUser, {
    onSuccess,
    onError
  });
};

export default useLoginUser;
