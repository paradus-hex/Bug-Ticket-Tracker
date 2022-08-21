import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useGetAllUsers } from '../../../api/useGetAllUsers';

function Users() {
  const onSuccess = (data) => {
    console.log(data);
  };
  const { isLoading, data, isError, error } = useGetAllUsers(onSuccess);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const { users } = data?.data;

  const columns = [
    { headerName: 'ID', field: 'user_id', width: 150 },
    { headerName: 'Name', field: 'name', width: 150 },
    { headerName: 'Email', field: 'email', width: 150 },
    { headerName: 'Role', field: 'user_authority', width: 150 }
  ];

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <h1 align='center'>React-App</h1>
      <h4 align='center'>Material Table with CRUD operation</h4>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.user_id}
      />
    </Box>
  );
}

export default Users;
