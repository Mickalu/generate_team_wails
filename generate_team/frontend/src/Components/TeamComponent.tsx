import React from 'react';
import { InputText } from 'primereact/inputtext';
import TeamType from '../types/TeamType';

interface TeamComponentProps {
  id: TeamType['id'];
  value: TeamType['name'];
  changeTeamName: any;
  teams: TeamType[];
};

const TeamComponent = ({
    id, 
    value, 
    changeTeamName,
    teams,
  }: TeamComponentProps) => (
    <div>
      <InputText placeholder={value} value={value} onChange={(e) => changeTeamName(e.target.value, id, teams)}/>
    </div>
);

export default TeamComponent;
