import React from 'react';
import { playerCellStyle, playerBottomCellStyle } from './style';
import { Box } from '@mui/material';

const PlayerCell = ({ player, lastItem }) => {
  const sxPlayer = lastItem ? playerBottomCellStyle : playerCellStyle;

  return (
    <Box sx={sxPlayer}>
      <span>{player.username}</span>
      <span>{player.level}</span>
    </Box>
  )
};

export default PlayerCell;
