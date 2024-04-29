import React from 'react';
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const PlayerInput = () => {
  return (
    <Box display={"flex"} alignItems={'stretch'} gap={"10px"} >
	<Button color='error'>{<ClearIcon />}</Button>
	<TextField size='small' sx={{ input: { color: '#ffffff' } }}/>
    </Box>
  )
};

export default PlayerInput;
