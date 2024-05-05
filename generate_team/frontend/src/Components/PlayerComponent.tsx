import React, { Dispatch, SetStateAction } from 'react';
import { PlayerType } from '../types/PlayerType';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';


type PlayerComponentProps = {
  id: string;
  setPlayersList: Dispatch<SetStateAction<PlayerType[]>>;
  playersList: PlayerType[];
};

const PlayerComponent = ({id, setPlayersList, playersList}: PlayerComponentProps) => {

  const deletePlayer = (idDelete: PlayerComponentProps['id']) => {
    const playersListCopy = [...playersList];
    const listFiltered = playersListCopy.filter((player) => player.id !== idDelete);
    setPlayersList(listFiltered);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', gap:'5px' }}>
      <InputText placeholder='nom' style={{borderRadius:'5px', flexGrow:'4'}} />
      <InputNumber placeholder='niveau' style={{borderRadius:'0px', flexGrow:'0'}} max={10} min={0} useGrouping={false} />
      <Button label='delete' onClick={() => deletePlayer(id)} /> 
    </div>
  )
};

export default PlayerComponent;
