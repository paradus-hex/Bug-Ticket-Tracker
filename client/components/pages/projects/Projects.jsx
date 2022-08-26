import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { useRouter } from 'next/router';
import * as React from 'react';
import useCreateProject from '../../../api/Projects/useCreateProject';
import useDeleteProject from '../../../api/Projects/useDeleteProject';
import { useGetAllProjects } from '../../../api/Projects/useGetAllProjects';
import useUpdateProject from '../../../api/Projects/useUpdateProject';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const { mutate: createProject } = useCreateProject();

  const handleClick = () => {
    const id = randomId().substring(0, 3);
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    createProject(ol);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Create Project
      </Button>
    </GridToolbarContainer>
  );
}

// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired
// };

function Projects() {
  const router = useRouter();
  const [rowModesModel, setRowModesModel] = React.useState({});
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

  const handleDeleteClick = (id) => () => {
    deleteProject(id);
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
        height: 750,
        width: '90%',
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        },
        display: 'flex',
        flexDirection: 'column',
        mx: 'auto'
      }}
    >
      <Typography variant='h5' gutterBottom alignSelf='center'>
        Project Information
      </Typography>
      <DataGrid
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
        componentsProps={{
          toolbar: { setRowModesModel }
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onRowClick={handleRowClick}
      />
    </Box>
  );
}

export default Projects;
