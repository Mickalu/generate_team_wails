import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Box, Snackbar, SnackbarCloseReason, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { v4 as uuid } from 'uuid';

import { PlayerType } from '../../types/PlayerType';
import PlayerComponent from '../../Components/PlayerComponent/PlayerComponent';
import { addPlayerState } from '../../store/Slice/playerSlice';

import { playerComponentStyle, addButtonBoxStyle, playersBoxStyle, addButtonStyle, numberAddPlayerInputStyle, numberPlayerTextStyle, playerHeaderStyle } from './styles';
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
    if (playersList.length + numberAddPlayers > 50) {
      setOpen(true);
      return 
    }

    const listOfPlayers = Array(numberAddPlayers).fill({...initPlayer}).map(() => ({id: uuid(), level: 0, username: ''})); 
    const newPlayerList = [...playersList].concat(listOfPlayers);
    setPlayersList(newPlayerList);
    dispatch(addPlayerState(listOfPlayers));
    setNumberAddPlayers(1);
  };

  const [open, setOpen] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box sx={playerComponentStyle}>
      <Box sx={playerHeaderStyle}>
        <Box sx={numberPlayerTextStyle}>
          <span>Nombre de joueurs : {playersList.length} </span>
        </Box>
      
        <Box sx={addButtonBoxStyle}>
          <TextField
            style={numberAddPlayerInputStyle}
            id="outlined-number"
            placeholder='niveau'
            type="number"
            variant='standard'
            value={numberAddPlayers}
            inputProps={{ min: 1, max: 50 }}
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

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={"error"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          Vous avez atteint la limite de joueurs possible.
        </Alert>

      </Snackbar>

    </Box>
  )
};

export default PlayersContainers;
