import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid';
import React from 'react';
import { useGetAllUsers } from '../../../api/useGetAllUsers';

function Users() {
  const [rowModesModel, setRowModesModel] = React.useState({});

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

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    console.log(rowModesModel);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    console.log(rowModesModel);
  };

  const handleDeleteClick = (id) => () => {
    // setRows(rows.filter((row) => row.id !== id));
    console.log('deleted');
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
    // const updatedRow = { ...newRow, isNew: false };
    // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    // return updatedRow;
    console.log('updated');
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
    <Box sx={{ width: '100%' }}>
      <h1 align='center'>Users Information</h1>
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
