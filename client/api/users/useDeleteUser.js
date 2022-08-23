import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const deleteUser = (userID) => {
  return axios.delete(`http://localhost:8000/api/v1/users/${userID}`, {
    headers: {
      token: localStorage.getItem('token')
    }
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-users']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useDeleteUser;
