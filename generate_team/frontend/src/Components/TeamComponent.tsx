import React from 'react';
import  TextField  from '@mui/material/TextField';
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
      <TextField variant="standard" placeholder={value}  value={value} onChange={(e) => changeTeamName(e.target.value, id, teams)}/>
    </div>
);

export default TeamComponent;
