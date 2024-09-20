import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { v4 as uuid } from 'uuid';

import { PlayerType } from '../../types/PlayerType';
import PlayerComponent from '../../Components/PlayerComponent/PlayerComponent';
import { addPlayerState } from '../../store/Slice/playerSlice';

import { playerComponentStyle, addButtonBoxStyle, playersBoxStyle, addButtonStyle, numberAddPlayerInputStyle } from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks';



const PlayersContainers = () => {
  const initPlayer = {
    id: uuid(),
    level: 0,
    username: '',
  }
  const dispatch = useAppDispatch();
  const playersState = useAppSelector((state) => state.players.players);
  const [playersList, setPlayersList] = useState<PlayerType[]>([])
  const [numberAddPlayers, setNumberAddPlayers] = useState<number>(1);

  useEffect(() => {
    setPlayersList(playersState);
  }, [playersState])

  const addPLayer = () => {
    const listOfPlayers = Array(numberAddPlayers).fill({...initPlayer}).map(() => ({id: uuid(), level: 0, username: ''})); 
    const newPlayerList = [...playersList].concat(listOfPlayers);
    setPlayersList(newPlayerList);
    dispatch(addPlayerState(listOfPlayers));
    setNumberAddPlayers(1);
  };

  return (
    <Box sx={playerComponentStyle}>
      <Box sx={addButtonBoxStyle}>
        <TextField
          style={numberAddPlayerInputStyle}
          id="outlined-number"
          placeholder='niveau'
          type="number"
          variant='standard'
          value={numberAddPlayers}
          inputProps={{ min: 1, max: 10000 }}
          onChange={(e) => setNumberAddPlayers(Number(e.target.value))}
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <Button
          variant='contained'
          sx={addButtonStyle}
          className='mb-3 md:mb-0'
          onClick={() => addPLayer()}
        > <AddIcon /> </Button>
      </Box>

      <Box sx={playersBoxStyle}>
        {playersList.map((player) => <PlayerComponent
          key={`player-${player.id}`}
          id={player.id}
          setPlayersList={setPlayersList}
          playersList={playersList}
        />
        )
        }
      </Box>

    </Box>
  )
};

export default PlayersContainers;
