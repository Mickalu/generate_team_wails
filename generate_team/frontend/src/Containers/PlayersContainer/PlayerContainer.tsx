import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { v4 as uuid } from 'uuid';

import { PlayerType } from '../../types/PlayerType';
import PlayerComponent from '../../Components/PlayerComponent/PlayerComponent';
import { addPlayerState, removePlayerState } from '../../store/Slice/playerSlice';

import { playerComponentStyle, addButtonBoxStyle, playersBoxStyle, addButtonStyle } from './styles';
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

  useEffect(() => {
    setPlayersList(playersState);
  }, [playersState])

  const addPLayer = () => {
    const newPlayerList = [...playersList, initPlayer];
    setPlayersList(newPlayerList);
    dispatch(addPlayerState(initPlayer));
  };

  return (
    <Box sx={playerComponentStyle}>
      <Box sx={addButtonBoxStyle}>
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
