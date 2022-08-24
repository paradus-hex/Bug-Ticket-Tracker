import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getProjectTickets = (projectID) => {
  return axios.get(`http://localhost:8000/api/v1/projects/${projectID}`);
};

export const useGetProjectTickets = (projectID) => {
  return useQuery(
    ['get-projects-tickets', projectID],
    () => getProjectTickets(projectID),
    {
      onError: (err) => {
        console.log(err.response);
      }
    }
  );
};
