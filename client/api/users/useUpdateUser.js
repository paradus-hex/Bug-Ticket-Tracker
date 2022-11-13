import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
const updateUser = ({ user_id, name, email, user_authority }) => {
  return axios.put(
    `https://api.bugtracker.click/api/v1/users/${user_id}`,
    {
      name,
      email,
      user_authority
    },
    {
      headers: {
        token: localStorage.getItem('token')
      }
    }
  );
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['get-users']);
    },
    onError: (err) => {
      console.log(err.response.data);
    }
  });
};

export default useUpdateUser;
