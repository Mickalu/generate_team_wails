import React, { useEffect, useState, useRef } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box } from '@mui/material';
import { useAppSelector } from '../../../hooks';
import TeamResultComponent from '../../../Components/TeamResultComponent/TeamResultComponent';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { boxTablesStyle, syncAltIconStyle, boxCopyButtons } from './style';
import { useDispatch } from 'react-redux';
import { initGeneratorResult } from '../../../store/Slice/generatorResultSlice';
import html2canvas from 'html2canvas';
import { ClipboardWriteImageFunc } from '../../../../wailsjs/go/main/App';

const TeamsResultContainer = () => {
  const resultGenerator = useAppSelector(state => state.generatorResult.result);
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [result, setResult] = useState(resultGenerator);

  const dispatch = useDispatch();

  const refResult = useRef();

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
    const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const copyResultToClickBoard = async () => {
    if (!refResult.current) return;

    const canvas = await html2canvas(refResult.current);
    console.log(canvas.toDataURL('image/png'))


    canvas.toBlob(async (blob) => {
      if (blob) {
        const arrayBuffer = await blob.arrayBuffer();
        const base64data = arrayBufferToBase64(arrayBuffer);
        ClipboardWriteImageFunc(base64data);
      } else {
        console.error('Failed to convert canvas to blob.');
      }
    });

  };


  return (
    <Box>
      {hasResult &&
        <Box>
          <Box sx={boxTablesStyle} ref={refResult}>
            <TeamResultComponent resultGenerator={resultGenerator} index={0} />
            <Box onClick={() => switchPlayers()} > <SyncAltIcon sx={syncAltIconStyle} /> </Box>
            <TeamResultComponent resultGenerator={resultGenerator} index={1} />
          </Box>
          <Box sx={boxCopyButtons}>
            <Box sx={{marginRight: "30px"}} onClick={() => copyResultToClickBoard()}> <ContentCopyIcon sx={syncAltIconStyle} /> </Box>
            
          </Box>
        </Box>
      }
    </Box>
  )
}

export default TeamsResultContainer;
