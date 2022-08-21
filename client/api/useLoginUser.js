import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const loginUser = (loginPayload) => {
  return axios.post('http://localhost:8000/api/v1/login', loginPayload);
};

const useLoginUser = (onSuccess) => {
  return useMutation(loginUser, {
    onSuccess,
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useLoginUser;
