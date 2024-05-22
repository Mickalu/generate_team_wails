import React, { useId, useState } from 'react';
import TeamType from '../types/TeamType';
import TeamComponent from '../Components/TeamComponent';

const initTeams: TeamType[] = [
  {id:1, name: 'Sombre'},
  {id:2, name: 'Clair'},
];

const TeamsContainer = () => {
  const [teams, setTeams] = useState<TeamType[]>(initTeams);

  const changeTeamName = (value: TeamType['name'], id: TeamType['id'], teams: TeamType[]) => {

    const copyTeams = [...teams];
    const teamToUpdate = copyTeams.find(team => team.id == id);

    if (teamToUpdate){
      teamToUpdate.name = value;
      setTeams(copyTeams);
    };
  };
  
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'flex-start'}}>
      {teams.map((team: TeamType) => (<TeamComponent key={`team-${team.id}`} id={team.id} value={team.name} changeTeamName={changeTeamName} teams={teams} />))}
    </div>
  )
};

export default TeamsContainer;
