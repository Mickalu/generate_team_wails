import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import Button from '@mui/material/Button';

import { generateButtonBoxStyle, generateButtonStyle } from './style';
import { PlayerType } from '../../types/PlayerType';

const GenerateContainer = () => {
  const [displayError, setDisplayError] = useState<boolean>(false);

  const [playersList, setPlayersList] = useState<PlayerType[]>([])

  const generateTeams = () => {
    setDisplayError(false);
    if (playersList.length % 2 !== 0) {
      setDisplayError(true);
    }
  };
  return (
    <Box sx={generateButtonBoxStyle}>
      {displayError && <Alert severity='error'> Il faut un nombre de joueurs paire. </Alert>}
      <Button sx={generateButtonStyle} variant="contained" color="success" onClick={() => generateTeams()} >Générer</Button>
    </Box >
  )
};

export default GenerateContainer;
