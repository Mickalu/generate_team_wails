import React from 'react';
import PlayersContainers from '../PlayersContainer/PlayerContainer';
import TeamsContainer from '../TeamsContainer/TeamsContainer.tsx'
import GenerateContainer from '../GenerateContainer/GenerateContainer.tsx';

import { headerStyle, bodyBoxStyle } from "./styles"
import { Box } from '@mui/material';

const HomePageContainers = () => {
  return (
    <>
      <Box sx={headerStyle}>
        <h1> Générateur d'équipe </h1>
      </Box>
      <Box sx={bodyBoxStyle}  >
        <Box width={'40%'}>
          <PlayersContainers />
        </Box>

        <Box width={'40%'} >
          <TeamsContainer />
        </Box>
      </Box>
      <Box>
        <GenerateContainer />
      </Box>
    </>
  )
};

export default HomePageContainers;
