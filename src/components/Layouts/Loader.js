import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const styles = {
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Set height to 100% of viewport height
    },
  };

export default function CircularIndeterminate() {
  return (
    <Box sx={styles.box}>
      <CircularProgress />
    </Box>
  );
}