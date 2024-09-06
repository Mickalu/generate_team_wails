import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import Button from '@mui/material/Button';

import { generateButtonBoxStyle, generateButtonStyle } from './style';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { initGeneratorResult } from '../../store/Slice/generatorResultSlice';
import {GeneratorFunc} from "../../../wailsjs/go/main/App";

const GenerateContainer = () => {
  const players = useAppSelector(state => state.players.players);
  const teams = useAppSelector(state => state.teams.teams);

  const copyPlayers = [...players];
  const copyTeams = [...teams];

  const dispatch = useAppDispatch();
  const [displayError, setDisplayError] = useState<boolean>(false);

  const generateTeams = () => {
    setDisplayError(false);
    if (copyPlayers.length % 2 !== 0) {
      setDisplayError(true);
    }
    else {
      GeneratorFunc(copyTeams, copyPlayers).then(result => {

        for (const team of result){
          for (const player of team.players){
            player.isActive = false;
          }
        }
        
        dispatch(initGeneratorResult(result));
      });
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
