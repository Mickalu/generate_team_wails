import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

import { teamCellStyle } from './style';
import PlayerCell from './PlayerCell';
import { PlayerType } from '../../types/PlayerType';


const TeamResultComponent = ({ resultGenerator, index}) => {
  const teamResult = resultGenerator[index]

  const sumLevels = teamResult.players.reduce(
    (n: number, player) => n + player.level, 0
  )

  const meanTeam = sumLevels / teamResult.players.length;
  const isLastItem = (index: number) => (
    index + 1 === teamResult.players.length
  )


  return (<Box sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
    <Box sx={teamCellStyle}>
      <span> {teamResult.team.name} </span>
      <span> Moyenne : {meanTeam} </span>
    </Box>
    {teamResult.players.map((player: PlayerType, index: number) => <PlayerCell key={`${player.id}-${index}`} player={player} lastItem={isLastItem(index)} />)}
  </Box>
  )
}

export default TeamResultComponent;
