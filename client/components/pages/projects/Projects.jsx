import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer
} from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import * as React from 'react';
import useCreateProject from '../../../api/Projects/useCreateProject';
import useDeleteProject from '../../../api/Projects/useDeleteProject';
import { useGetAllProjects } from '../../../api/Projects/useGetAllProjects';
import useUpdateProject from '../../../api/Projects/useUpdateProject';
import ConfirmDeleteDialog from '../../common/ConfirmDeleteDialog';
import CreateProjectForm from '../../common/createProjectForm';
import DialogComponent from '../../common/DialogComponent';

function EditToolbar() {
  const { mutate: createProject } = useCreateProject();

  return (
    <GridToolbarContainer>
      <DialogComponent
        title='Provide project details'
        buttonTitle='Create Project'
      >
        <CreateProjectForm handleCreateProject={createProject} />
      </DialogComponent>
    </GridToolbarContainer>
  );
}

function Projects() {
  const router = useRouter();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState();
  const { mutate: updateProject } = useUpdateProject();

  const onSuccess = (data) => {
    // console.log(data);
  };
  const { isLoading, data, isError, error } = useGetAllProjects(onSuccess);
  const { mutate: deleteProject } = useDeleteProject();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const { project } = data?.data;

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
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  // const handleDeleteClick = (id) => () => {
  //   deleteProject(id);
  // };
  const handleDeleteClick = (id) => () => {
    setOpen(true);
    setDeleteID(id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const processRowUpdate = (newRow) => {
    updateProject(newRow);
    return newRow;
  };

  const handleRowClick = (params) => {
    router.push(`/projects/${params.id}`);
  };

  const columns = [
    { headerName: 'ID', field: 'project_id', flex: 1 },
    { headerName: 'Name', field: 'name', flex: 1, editable: true },
    {
      headerName: 'Description',
      field: 'description',
      flex: 1,
      editable: true
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
        maxHeight: 750,
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
        Project Information
      </Typography>

      <ConfirmDeleteDialog
        dialogOpen={open}
        dialogClose={() => {
          setOpen(false);
        }}
        handleDeleteUser={() => deleteProject(deleteID)}
        entity='Project'
      />

      <DataGrid
        autoHeight
        rows={project}
        columns={columns}
        getRowId={(row) => row.project_id}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}

export default Projects;
