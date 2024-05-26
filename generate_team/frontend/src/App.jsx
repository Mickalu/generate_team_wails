import './App.css';
import  HomePageContainers from './Containers/HomePageContainers';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import { Box } from '@mui/material';


function App() {
  return (
      <ThemeProvider theme={theme} >
        <Box sx={{width:"100%", height:'100vh', background:'background'}} >
          <HomePageContainers />		
        </Box>
      </ThemeProvider>
  )
};

export default App;
