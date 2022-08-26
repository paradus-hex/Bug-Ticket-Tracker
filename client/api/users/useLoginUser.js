import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const loginUser = (loginPayload) => {
  console.log('here');
  return axios.post('http://localhost:8000/api/v1/login', loginPayload);
};

const useLoginUser = (onSuccess, onError) => {
  return useMutation(loginUser, {
    onSuccess,
    onError
  });
};

export default useLoginUser;
