import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridToolbarContainer
} from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import * as React from 'react';
import useAssignDevs from '../../../api/Projects/useAssignDevs';
import { useGetProjectTickets } from '../../../api/Projects/useGetProjectTickets';
import useRemoveDev from '../../../api/Projects/useRemoveDev';
import useCreateTicket from '../../../api/Tickets/useCreateTicket';
import useDeleteTicket from '../../../api/Tickets/useDeleteTicket';
import useUpdateTicket from '../../../api/Tickets/useUpdateTicket';
import ChipsArray from '../../common/Chip';
import ConfirmDeleteDialog from '../../common/ConfirmDeleteDialog';
import CreateTicketForm from '../../common/CreateTicketForm';
import DialogComponent from '../../common/DialogComponent';
import DialogSelect from '../../common/DialogSelect';

function EditToolbar() {
  const router = useRouter();
  const { projectId } = router.query;
  const { mutate: createTicket } = useCreateTicket(projectId);

  return (
    <GridToolbarContainer>
      <DialogComponent
        title='Provide project details'
        buttonTitle='Create Ticket'
      >
        <CreateTicketForm handleCreateTicket={createTicket} />
      </DialogComponent>
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
  const [open, setOpen] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState();

  const { mutate: updateTicket } = useUpdateTicket();
  const { isLoading, data, isError, error } = useGetProjectTickets(projectId);
  const { mutate: assignDevs } = useAssignDevs(projectId);
  const { mutate: removeDev } = useRemoveDev(projectId);
  const { mutate: deleteTicket } = useDeleteTicket(projectId);

  if (!projectId) {
    return <h2>Loading...</h2>;
  }

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
    setOpen(true);
    setDeleteID({ projectId, ticket_id });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const processRowUpdate = (newRow) => {
    const { created_at } = newRow;
    const yyyy = created_at.getFullYear();
    const mm = created_at.getMonth() + 1;
    const dd = created_at.getDate();
    const formattedDate = `${mm}-${dd}-${yyyy}`;
    const updatedRow = { ...newRow, created_at: formattedDate };
    console.log(newRow.created_at, formattedDate);
    updateTicket(updatedRow);
    return newRow;
  };

  const handleRowClick = (params) => {
    router.push(`/tickets/${params.id}`);
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
      valueOptions: ['Pending', 'Inprogress', 'Resolved'],
      editable: true,
      flex: 1
    },
    { headerName: 'Submitted By', field: 'name', flex: 1, editable: false },
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
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
          // flexDirection: 'column',
          // alignItems: 'center'
        }}
      >
        <Card
          sx={{
            mx: 10,
            my: 10,
            maxWidth: 700,
            flexGrow: 1,
            borderRadius: 4,
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.5)',
            '&:hover': {
              boxShadow: '0 16px 40px -12.125px rgba(0, 138, 255, 0.72)'
            }
          }}
        >
          <CardContent>
            <Typography gutterBottom variant='h5'>
              Project {name}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              {description}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            mx: 10,
            my: 10,
            flexGrow: 1,
            borderRadius: 4,
            boxShadow: '0 8px 40px -12px rgba(0,0,0,0.5)',
            '&:hover': {
              boxShadow: '0 16px 40px -12.125px rgba(0, 138, 255, 0.72)'
            }
          }}
        >
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
              />
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <DialogSelect
              users={availableUsers}
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
        <ConfirmDeleteDialog
          dialogOpen={open}
          dialogClose={() => {
            setOpen(false);
          }}
          handleDeleteUser={() => deleteTicket(deleteID)}
          entity='ticket'
        />
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
          onProcessRowUpdateError={(err) => {
            console.log(err);
          }}
        />
      </Box>
    </>
  );
}

export default ProjectTickets;
