import React from 'react';
import { playerCellStyle, playerBottomCellStyle } from './style';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updatePlayerActivity } from '../../store/Slice/generatorResultSlice';


const PlayerCell = ({ player, lastItem }) => {
  const sxPlayer = lastItem ? playerBottomCellStyle : playerCellStyle;

  const dispatch = useDispatch();

  const activateOrNotPlayer = (player) => {
    dispatch(updatePlayerActivity({id: player.id}))
  };

  const color = player.isActive ? "#D8D8D8" : "#fffffe";

  const styleCell = {...sxPlayer, backgroundColor: color};

  return (
    <Box sx={styleCell} onClick={() => activateOrNotPlayer(player)}>
      <span>{player.username}</span>
      <span>{player.level}</span>
    </Box>
  )
};

export default PlayerCell;
