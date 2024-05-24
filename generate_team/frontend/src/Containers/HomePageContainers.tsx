import React from 'react';
import PlayersContainers from './PlayersContainers';
import TeamsContainer from '../Containers/TeamsContainer';


const HomePageContainers = () => {
  return (
    <div style={{display:'flex'}}> 
      <PlayersContainers />
      <TeamsContainer />
    </div>
  )
};

export default HomePageContainers;
