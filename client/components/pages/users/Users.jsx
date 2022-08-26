import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import React from 'react';
import useDeleteUser from '../../../api/users/useDeleteUser';
import { useGetAllUsers } from '../../../api/users/useGetAllUsers';
import useUpdateUser from '../../../api/users/useUpdateUser';
import ConfirmDeleteDialog from '../../common/ConfirmDeleteDialog';

function Users() {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState();

  const { mutate: updateUser } = useUpdateUser();
  const onSuccess = (data) => {
    console.log(data);
  };
  const { isLoading, data, isError, error } = useGetAllUsers(onSuccess);
  const { mutate: deleteUser } = useDeleteUser();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const { users } = data?.data;

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View }
    });
  };

  const handleDeleteClick = (id) => () => {
    setOpen(true);
    setDeleteID(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    // const editedRow = rows.find((row) => row.id === id);
    // if (editedRow.isNew) {
    //   setRows(rows.filter((row) => row.id !== id));
    // }
  };

  const processRowUpdate = (newRow) => {
    updateUser(newRow);
    return newRow;
  };

  const columns = [
    { headerName: 'ID', field: 'user_id', flex: 1 },
    { headerName: 'Name', field: 'name', flex: 1, editable: true },
    { headerName: 'Email', field: 'email', flex: 1, editable: true },
    {
      headerName: 'Role',
      field: 'user_authority',
      type: 'singleSelect',
      valueOptions: ['admin', 'developer'],
      editable: true,
      flex: 1
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={
                <SaveIcon
                  color='info'
                  sx={{ '&:hover': { color: '#002db3' } }}
                />
              }
              label='Save'
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={
                <CancelIcon
                  color='warning'
                  sx={{ '&:hover': { color: 'red' } }}
                />
              }
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={
              <EditIcon
                color='disabled'
                sx={{ '&:hover': { color: '#FF8C00' } }}
              />
            }
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={
              <DeleteIcon
                color='disabled'
                sx={{ '&:hover': { color: 'red' } }}
              />
            }
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ];
      }
    }
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '90%',
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        },
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto',
        my: 10
      }}
    >
      <Typography variant='h5' gutterBottom alignSelf='center'>
        User Information
      </Typography>
      <ConfirmDeleteDialog
        dialogOpen={open}
        dialogClose={() => {
          setOpen(false);
        }}
        handleDeleteUser={() => deleteUser(deleteID)}
        entity='user'
      />

      <DataGrid
        autoHeight
        rows={users}
        columns={columns}
        getRowId={(row) => row.user_id}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}

export default Users;
