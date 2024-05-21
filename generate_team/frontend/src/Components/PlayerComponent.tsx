import React, { Dispatch, SetStateAction } from 'react';
import { PlayerType } from '../types/PlayerType';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {FloatLabel} from 'primereact/FloatLabel';
import { InputNumber} from 'primereact/InputNumber';


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

  const changeUsername = (value: PlayerType['username']) => {
    const playersListCopy = [...playersList];
    const index = playersListCopy.map(player => player.id).indexOf(id);

    const player = playersListCopy[index];
    player['username'] = value;

    playersListCopy[index] = player;

    setPlayersList(playersListCopy);
  }

  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', gap:'5px' }}>
      <InputText onChange={(e) => changeUsername(e.target.value) } placeholder='nom' style={{borderRadius:'5px', flexGrow:'4'}} />
      <InputNumber placeholder='niveau' style={{borderRadius:'0px', flexGrow:'0'}} minFractionDigits={1} max={10} min={0} />
      <Button label='delete' onClick={() => deletePlayer(id)} style={{backgroundColor:'var(--red-400)', borderBlock:'var(--red-400)'}} /> 
    </div>
  )
};

export default PlayerComponent;
