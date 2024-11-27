import React from 'react';
import PlayersContainers from '../PlayersContainer/PlayerContainer';
import TeamsContainer from '../TeamsContainer/TeamsContainer.tsx'
import GenerateContainer from '../GenerateContainer/GenerateContainer.tsx';
import ResultContainer from '../ResultContainer/resultContainer.tsx';

import { headerStyle, bodyBoxStyle, resultSectionStyle, playerAndGenStyle } from "./styles";
import { Box } from '@mui/material';

const HomePageContainers = () => {
  return (
    <Box sx={playerAndGenStyle}>
      <Box sx={headerStyle}>
        <h1> Générateur d'équipe </h1>
      </Box>

      <Box sx={{ marginBottom: '25px' }}>
        <Box sx={bodyBoxStyle} className="home" >
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
      </Box>

      <Box sx={resultSectionStyle}>
        <ResultContainer />
      </Box>
    </Box>
  )
};

export default HomePageContainers;
