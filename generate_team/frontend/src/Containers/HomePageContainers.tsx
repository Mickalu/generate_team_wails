import React from 'react';
import PlayersContainers from './PlayersContainers';
import TeamsContainer from '../Containers/TeamsContainer';
import { Box } from '@mui/material';
import { theme } from '../theme.ts';

const HomePageContainers = () => {
  return (
    <Box display={'flex'}  > 
      <Box width={'50%'}> 
        <PlayersContainers />
      </Box>

      <Box width={'50%'} >
        <TeamsContainer />
      </Box>

    </Box>
  )
};

export default HomePageContainers;
