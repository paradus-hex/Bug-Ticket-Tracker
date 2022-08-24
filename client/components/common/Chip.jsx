import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import * as React from 'react';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

export default function ChipsArray(props) {
  const [chipData, setChipData] = React.useState(props.assignedDevs);
  // const chipData = props.assignedDevs;

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.user_id !== chipToDelete.user_id)
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0
        // flexDirection: 'column'
      }}
      component='ul'
    >
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.user_id}>
            <Chip icon={icon} label={data.name} onDelete={handleDelete(data)} />
          </ListItem>
        );
      })}
    </Box>
  );
}
