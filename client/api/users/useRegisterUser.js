import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
const addNewUser = (registerPayload) => {
  return axios.post(
    'https://api.bugtracker.click/api/v1/users',
    registerPayload
  );
};

const useRegisterUser = (onSuccess) => {
  return useMutation(addNewUser, {
    onSuccess,
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useRegisterUser;
