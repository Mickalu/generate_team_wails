import './App.css';
import  HomePageContainers from './Containers/HomePageContainers';
import { PrimeReactProvider } from 'primereact/api';


function App() {
  return (
    <PrimeReactProvider>
      <HomePageContainers />		
    </PrimeReactProvider>
	
  )
};

export default App;
