import React, { Dispatch, SetStateAction, useState } from 'react';
import { PlayerType } from '../types/PlayerType';
import { TextField } from '@mui/material';
import Input from '@mui/material';
import Button from '@mui/material/Button';


type PlayerComponentProps = {
  id: string;
  setPlayersList: Dispatch<SetStateAction<PlayerType[]>>;
  playersList: PlayerType[];
};

const PlayerComponent = ({id, setPlayersList, playersList}: PlayerComponentProps) => {
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
    if (NUMBER_REGEX_INPUT.test(level)){
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
    <div style={{display: 'flex', justifyContent: 'flex-start', gap:'5px' }}>
      <TextField variant='standard' onChange={(e) => changeUsername(e.target.value) } placeholder='nom' style={{borderRadius:'5px', flexGrow:'4'}} />
      <TextField
          id="outlined-number"
          placeholder='niveau'
          type="number"
          variant='standard'
          value={levelValue}
          inputProps={{min:0, max:10}}
          onChange={(e) => changeLevelUser(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      <Button color='error'  onClick={() => deletePlayer(id)}>Supprimer</Button> 
    </div>
  )
};

export default PlayerComponent;
