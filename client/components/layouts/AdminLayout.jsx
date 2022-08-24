import { Box } from '@mui/system';
import React from 'react';
import { Sidebar } from '../pages';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
      }}
    >
      <Sidebar />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          mt: 10,
          mb: 4
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
