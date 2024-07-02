import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import TeamResultComponent from '../../../Components/TeamResultComponent/TeamResultComponent';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { boxTablesStyle, syncAltIconStyle } from './style';

const TeamsResultContainer = () => {
  const resultGenerator = useAppSelector(state => state.generatorResult.result);

  const [hasResult, setHasResult] = useState<boolean>(false);

  useEffect(() => {
    const copyResult = [...resultGenerator];
    setHasResult(copyResult.length > 0);
  }, [resultGenerator]);

  return (
    <Box>
      {hasResult &&
        <Box sx={boxTablesStyle}>
          <TeamResultComponent teamResult={resultGenerator[0]} />
          <Box > <SyncAltIcon sx={syncAltIconStyle} /> </Box>
          <TeamResultComponent teamResult={resultGenerator[1]} />
        </Box>
      }
    </Box>
  )
}

export default TeamsResultContainer
