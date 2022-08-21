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
    { headerName: 'ID', field: 'user_id', flex: 1 },
    { headerName: 'Name', field: 'name', flex: 1 },
    { headerName: 'Email', field: 'email', flex: 1 },
    {
      headerName: 'Role',
      field: 'user_authority',
      type: 'singleSelect',
      valueOptions: ['admin', 'developer'],
      editable: true,
      flex: 1
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <h1 align='center'>Users Information</h1>
      <DataGrid
        autoHeight
        rows={users}
        columns={columns}
        getRowId={(row) => row.user_id}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5
        })}
      />
    </Box>
  );
}

export default Users;
