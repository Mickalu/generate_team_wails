import React, { Dispatch, SetStateAction, useState } from 'react';
import { PlayerType } from '../../types/PlayerType';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


import { PlayerComponentStyle, deleteButtonStyle, usernameInputStyle, levelInputStyle } from './styles';
import Box from '@mui/material/Box';


type PlayerComponentProps = {
  id: string;
  setPlayersList: Dispatch<SetStateAction<PlayerType[]>>;
  playersList: PlayerType[];
};

const PlayerComponent = ({ id, setPlayersList, playersList }: PlayerComponentProps) => {
  const NUMBER_REGEX_INPUT = /([0-9]*[.])?[0-9]+/;

  const [levelValue, setLevelValue] = useState<string>('0');

  const deletePlayer = (idDelete: PlayerComponentProps['id']) => {
    const playersListCopy = [...playersList];
    const listFiltered = playersListCopy.filter((player) => player.id !== idDelete);
    setPlayersList(listFiltered);
  };

  const changeUsername = (value: PlayerType['username']) => {
    const playersListCopy = [...playersList];
    const index = playersListCopy.map(player => player.id).indexOf(id);

    const player = playersListCopy[index];
    player['username'] = value;

    playersListCopy[index] = player;

    setPlayersList(playersListCopy);
  };

  const changeLevelUser = (level: string) => {
    if (NUMBER_REGEX_INPUT.test(level)) {
      const playersListCopy = [...playersList];
      const player = playersListCopy.find(player => player.id === id);

      if (player) {
        player.level = Number(level);
        setPlayersList(playersListCopy);
        setLevelValue(level);
      }
    }
  };

  return (
    <Box sx={PlayerComponentStyle}>
      <TextField variant='standard' onChange={(e) => changeUsername(e.target.value)} placeholder='nom' sx={usernameInputStyle} />
      <TextField
        id="outlined-number"
        placeholder='niveau'
        type="number"
        variant='standard'
        value={levelValue}
        inputProps={{ min: 0, max: 10 }}
        onChange={(e) => changeLevelUser(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={levelInputStyle}
      />
      <Button variant='contained' sx={deleteButtonStyle} onClick={() => deletePlayer(id)}><CloseIcon /></Button>
    </Box>
  )
};

export default PlayerComponent;
