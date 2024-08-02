import React, { useState } from 'react';
import { Alert, Box } from '@mui/material';
import Button from '@mui/material/Button';

import { generateButtonBoxStyle, generateButtonStyle } from './style';
import { PlayerType } from '../../types/PlayerType';
import { useAppDispatch, useAppSelector } from '../../hooks';
import TeamType from '../../types/TeamType';
import { initGeneratorResult } from '../../store/Slice/generatorResultSlice';
import { teamResultProps } from '../../store/Slice/generatorResultSlice';
import {GeneratorFunc} from "../../../wailsjs/go/main/App";

const fakeResult = (teams: TeamType[], players: PlayerType[]): teamResultProps[] => {
  return [
    {
      team: teams[0],
      players: players.splice(0, players.length / 2),
    },
    {
      team: teams[1],
      players: players.splice(players.length / 2, players.length),
    }
  ]
}

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
        console.log(result)
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
