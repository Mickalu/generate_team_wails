import React from 'react';
import PlayersContainers from '../PlayersContainer/PlayerContainer';
import TeamsContainer from '../TeamsContainer/TeamsContainer.tsx'
import GenerateContainer from '../GenerateContainer/GenerateContainer.tsx';
import ResultContainer from '../ResultContainer/resultContainer.tsx';

import { headerStyle, bodyBoxStyle, resultSectionStyle } from "./styles";
import { Box } from '@mui/material';

const HomePageContainers = () => {
  return (
    <>
      <Box sx={headerStyle}>
        <h1> Générateur d'équipe </h1>
      </Box>

      <Box sx={{ marginBottom: '25px' }}>
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
      </Box>

      <Box sx={resultSectionStyle}>
        <ResultContainer />
      </Box>
    </>
  )
};

export default HomePageContainers;
