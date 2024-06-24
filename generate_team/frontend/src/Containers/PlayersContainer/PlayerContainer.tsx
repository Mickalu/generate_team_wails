import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Alert, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { v4 as uuid } from 'uuid';

import { PlayerType } from '../../types/PlayerType';
import PlayerComponent from '../../Components/PlayerComponent/PlayerComponent';

import { playerComponentStyle, addButtonBoxStyle, playersBoxStyle, addButtonStyle } from './styles';



const PlayersContainers = () => {
  const initPlayer = {
    id: uuid(),
    level: 0,
    username: '',
  }

  const [playersList, setPlayersList] = useState<PlayerType[]>([])

  const addPLayer = () => (
    setPlayersList([...playersList, initPlayer])
  );

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
