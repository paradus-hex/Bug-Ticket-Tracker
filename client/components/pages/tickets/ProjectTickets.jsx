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

import { Card, CardActions, CardContent } from '@mui/material';
import useAssignDevs from '../../../api/Projects/useAssignDevs';
import { useGetProjectTickets } from '../../../api/Projects/useGetProjectTickets';
import useRemoveDev from '../../../api/Projects/useRemoveDev';
import ChipsArray from '../../common/Chip';
import DialogSelect from '../../common/DialogSelect';
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId().substring(0, 3);
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    createticket(ol);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color='primary' startIcon={<AddIcon />} onClick={handleClick}>
        Create ticket
      </Button>
    </GridToolbarContainer>
  );
}
function NoTickets() {
  return (
    <Typography
      color='text.secondary'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh'
      }}
    >
      No Tickets to display
    </Typography>
  );
}
// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired
// };

function ProjectTickets() {
  const router = useRouter();
  const { projectId } = router.query;

  const [rowModesModel, setRowModesModel] = React.useState({});

  // const { mutate: updateTicket } = useUpdateTicket();
  // if (!projectId) {
  //   return <h2>Loading...</h2>;
  // }
  console.log(router.query);
  const { isLoading, data, isError, error } = useGetProjectTickets(projectId);
  const { mutate: assignDevs } = useAssignDevs(projectId);
  const { mutate: removeDev } = useRemoveDev(projectId);
  const { mutate: deleteTicket } = useDeleteTicket(projectId);
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  const { ticket, project, availableUsers, projectAssignments } = data?.data;
  const { name, description } = project[0];
  // // console.log(projectAssignments);

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

  const handleDeleteClick = (ticket_id) => () => {
    deleteTicket({ projectId, ticket_id });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const processRowUpdate = (newRow) => {
    updateTicket(newRow);
    return newRow;
  };

  const handleRowClick = (params) => {
    router.push(`/Tickets/${params.id}`);
  };

  const columns = [
    { headerName: 'Ticket ID', field: 'ticket_id', flex: 1 },
    { headerName: 'Title', field: 'title', flex: 1, editable: true },
    {
      headerName: 'Description',
      field: 'description',
      flex: 1,
      editable: true
    },
    {
      headerName: 'Status',
      field: 'status',
      type: 'singleSelect',
      valueOptions: ['TODO', 'in-progress', 'resolved'],
      editable: true,
      flex: 1
    },
    { headerName: 'Submitted By', field: 'name', flex: 1, editable: true },
    {
      field: 'created_at',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
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
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
          // flexDirection: 'column',
          // alignItems: 'center'
        }}
      >
        <Card sx={{ mx: 10, my: 10, flexGrow: 1 }}>
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Project {name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {description}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mx: 10, my: 10, flexGrow: 1 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              Assigned Developers To {name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              <ChipsArray
                assignedDevs={projectAssignments}
                handleRemoveDev={removeDev}
                handleRemoveDev={removeDev}
              />
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <DialogSelect
              users={availableUsers}
              handleAssignDevs={assignDevs}
              handleAssignDevs={assignDevs}
            />
          </CardActions>
        </Card>
      </Box>
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
          mx: 'auto'
        }}
      >
        <Typography variant='h5' gutterBottom alignSelf='center'>
          Ticket's under {name}
        </Typography>

        <DataGrid
          rows={ticket}
          columns={columns}
          getRowId={(row) => row.ticket_id}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          components={{
            Toolbar: EditToolbar,
            NoRowsOverlay: NoTickets
          }}
          componentsProps={{
            toolbar: { setRowModesModel }
          }}
          experimentalFeatures={{ newEditingApi: true }}
          onRowClick={handleRowClick}
        />
      </Box>
    </>
  );
}

export default ProjectTickets;
