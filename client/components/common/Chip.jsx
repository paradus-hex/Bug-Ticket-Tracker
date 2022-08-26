import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import * as React from 'react';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5)
}));

export default function ChipsArray({
  assignedDevs,
  handleRemoveDev,
  ...props
}) {
  const [chipData, setChipData] = React.useState(assignedDevs);
  React.useEffect(() => {
    setChipData(assignedDevs);
  }, [assignedDevs]);

  const router = useRouter();
  const { projectId } = router.query;

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.user_id !== chipToDelete.user_id)
    );
    handleRemoveDev({ projectId, user_id: chipToDelete.user_id });
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
      // component='ul'
    >
      {chipData.map((data) => {
        return (
          <ListItem key={data.user_id}>
            <Chip
              label={data.name}
              onDelete={handleDelete(data)}
              sx={{
                boxShadow: '0 8px 40px -12px rgba(0,0,0,0.5)',
                '&:hover': {
                  boxShadow: '16px 0 20px -5px #CE93D8'
                }
              }}
            />
          </ListItem>
        );
      })}
    </Box>
  );
}
