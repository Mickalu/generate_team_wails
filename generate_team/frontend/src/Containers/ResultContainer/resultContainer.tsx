import React from 'react';
import { Box } from '@mui/material';

import TeamsResultContainer from './TeamResultContainer/TeamsResultContainer';

const ResultContainer = () => {

  return (
    <Box sx={{ width: '100%', "marginBottom": '15px' }}>
      <h1>Résultat</h1>
      <TeamsResultContainer />
    </Box>
  )
};

export default ResultContainer;
