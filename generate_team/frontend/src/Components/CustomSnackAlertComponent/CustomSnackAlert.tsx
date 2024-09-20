import React, {useState} from 'react';
import { Snackbar, SnackbarCloseReason, Alert, Box } from '@mui/material';

const CustomSnackAlert = (
  message: string,
  isAlert: boolean,
  openInit: boolean
) => {
  const [open, setOpen] = useState(openInit);

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
  <Box>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={isAlert ? "error" : "success"}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  </Box>
  )

}
export default CustomSnackAlert
