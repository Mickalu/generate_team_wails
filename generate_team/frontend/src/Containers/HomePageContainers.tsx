import React from 'react';
import PlayersContainers from './PlayersContainers';
import TeamsContainer from '../Containers/TeamsContainer';

import "primereact/resources/themes/lara-light-cyan/theme.css";


const HomePageContainers = () => {
  return (
    <div style={{display:'flex'}}> 
      <PlayersContainers />
      <TeamsContainer />
    </div>
  )
};

export default HomePageContainers;
