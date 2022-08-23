import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import React from 'react';
import useDeleteUser from '../../../api/users/useDeleteUser';
import { useGetAllUsers } from '../../../api/users/useGetAllUsers';
import useUpdateUser from '../../../api/users/useUpdateUser';
function Users() {
  const [rowModesModel, setRowModesModel] = React.useState({});
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
    deleteUser(id);
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
              icon={<SaveIcon />}
              label='Save'
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
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
        width: '100%',
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        }
      }}
    >
      <DataGrid
        autoHeight
        rows={users}
        columns={columns}
        getRowId={(row) => row.user_id}
        // getRowSpacing={(params) => ({
        //   top: params.isFirstVisible ? 0 : 5,
        //   bottom: params.isLastVisible ? 0 : 5
        // })}
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
