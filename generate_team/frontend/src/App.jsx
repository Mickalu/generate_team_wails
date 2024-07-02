import './App.css';
import HomePageContainers from './Containers/HomePageContainer/HomePageContainer';
import { theme } from './theme';
import { Box } from '@mui/material';


function App() {
  return (
    <Box sx={{ width: "100%", height: '100vh', background: 'background', backgroundColor: theme.palette.background }} >
      <HomePageContainers />
    </Box>
  )
};

export default App;
