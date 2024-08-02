import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PlayerType } from '../../types/PlayerType';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { removePlayerState } from '../../store/Slice/playerSlice';


import { PlayerComponentStyle, deleteButtonStyle, usernameInputStyle, levelInputStyle } from './styles';
import Box from '@mui/material/Box';
import {
  changePlayerUsernameState,
  changePlayerLevelUserState,
} from '../../store/Slice/playerSlice';
import { useAppDispatch } from '../../hooks';


type PlayerComponentProps = {
  id: string;
  setPlayersList: Dispatch<SetStateAction<PlayerType[]>>;
  playersList: PlayerType[];
};

const PlayerComponent = ({ id, setPlayersList, playersList }: PlayerComponentProps) => {
  const NUMBER_REGEX_INPUT = /^(10(\.00?)?|([0-9](\.\d{1,2})?)?)$|^$/;

  const dispatch = useAppDispatch();
  const [levelValue, setLevelValue] = useState<string>('0');

  const deletePlayer = (idDelete: PlayerComponentProps['id']) => {
    dispatch(removePlayerState({ id: idDelete }));
  };

  const changeUsername = (value: PlayerType['username']) => {
    const playersListCopy = [...playersList];
    const index = playersListCopy.map(player => player.id).indexOf(id);
    const player = playersListCopy[index];

    dispatch(changePlayerUsernameState({ id: player.id, value: value }));
  };

  const changeLevelUser = (level: string) => {
    if (NUMBER_REGEX_INPUT.test(level)) {
      const playersListCopy = [...playersList];
      const player = playersListCopy.find(player => player.id === id);

      if (player) {
        setLevelValue(level);
        dispatch(changePlayerLevelUserState({ id: player.id, value: parseFloat(level) }));
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
