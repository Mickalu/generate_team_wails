import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import TeamResultComponent from '../../../Components/TeamResultComponent/TeamResultComponent';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { boxTablesStyle, syncAltIconStyle } from './style';
import { useDispatch } from 'react-redux';
import { initGeneratorResult } from '../../../store/Slice/generatorResultSlice';

const TeamsResultContainer = () => {
  const resultGenerator = useAppSelector(state => state.generatorResult.result);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [result, setResult] = useState(resultGenerator);

  const dispatch = useDispatch();

  useEffect(() => {
    const copyResult = [...resultGenerator];
    setHasResult(copyResult.length > 0);
    setResult(resultGenerator);
  }, [resultGenerator]);


  const switchPlayers = () => {
    const activePlayerTeam0 = result[0].players.filter(player => player.isActive === true);
    const activePlayerTeam1 = result[1].players.filter(player => player.isActive === true);


    if (activePlayerTeam0.length !== activePlayerTeam1.length) {
      return 
    }

    var copy = result.map(a => {return {...a}})
    
    const listPlayer0 = result[0].players.filter(player => !activePlayerTeam0.includes(player))
    copy[0].players = listPlayer0.concat(activePlayerTeam1);
    copy[0].players = copy[0].players.map(player => ({...player, isActive: false}));

    const listPlayer1 = result[1].players.filter(player => !activePlayerTeam1.includes(player))
    copy[1].players = listPlayer1.concat(activePlayerTeam0);
    copy[1].players = copy[1].players.map(player => ({...player, isActive: false}));

    dispatch(initGeneratorResult(copy));
  }


  return (
    <Box>
      {hasResult &&
        <Box sx={boxTablesStyle}>
          <TeamResultComponent resultGenerator={resultGenerator} index={0} />
          <Box onClick={() => switchPlayers()} > <SyncAltIcon sx={syncAltIconStyle} /> </Box>
          <TeamResultComponent resultGenerator={resultGenerator} index={1} />
        </Box>
      }
    </Box>
  )
}

export default TeamsResultContainer
