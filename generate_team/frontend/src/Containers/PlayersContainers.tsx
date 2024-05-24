import React, { useState } from 'react';
import Button from '@mui/material/Button';

import { v4 as uuid } from 'uuid';

import { PlayerType } from '../types/PlayerType';
import PlayerComponent from '../Components/PlayerComponent';
import { Alert, Box } from '@mui/material';


const PlayersContainers = () => {
  const initPlayer = {
    id: uuid(),
    level: 0,
    username: '',
  }

  const [playersList, setPlayersList] = useState<PlayerType[]>([])
  const [displayError, setDisplayError] = useState<boolean>(false);

  const addPLayer = () => (
     setPlayersList([...playersList, initPlayer])
  );

  const generatTeams = () => {
    setDisplayError(false);
    if (playersList.length % 2 !== 0) {
      setDisplayError(true);
    }
  };


  return (
      <Box>
        <div style={{display: 'flex', flexDirection:'row-reverse', marginBottom:'20px'}}>
          <Button 
            className='mb-3 md:mb-0'
            onClick={() => addPLayer()} 
          > Add </Button>
        </div>

        <div style={{display: 'flex', flexDirection:'column', gap:'10px 0px', width:'100%'}}> 
          {playersList.map((player) => <PlayerComponent
              key={`player-${player.id}`} 
              id={player.id} 
              setPlayersList={setPlayersList} 
              playersList={playersList} 
              />
            )
          }
        </div>

        <div style={{display: 'flex', flexDirection:'row-reverse', marginTop:'20px'}}> 
          {displayError && <Alert severity='error'> Il faut un nombre de joueurs paire. </Alert> }
          <Button variant="contained" color="success" onClick={() => generatTeams() } >Générer</Button>
        </div>
      </Box>
  )
};

export default PlayersContainers;
