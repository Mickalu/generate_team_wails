import React, { useState } from 'react';
import TeamType from '../../types/TeamType';
import TeamComponent from '../../Components/TeamComponent/TeamComponent';
import { teamContainerStyle } from './styles';
import { Box } from '@mui/material';

const initTeams: TeamType[] = [
  { id: 1, name: 'Sombre' },
  { id: 2, name: 'Clair' },
];

const TeamsContainer = () => {
  const [teams, setTeams] = useState<TeamType[]>(initTeams);

  const changeTeamName = (value: TeamType['name'], id: TeamType['id'], teams: TeamType[]) => {

    const copyTeams = [...teams];
    const teamToUpdate = copyTeams.find(team => team.id == id);

    if (teamToUpdate) {
      teamToUpdate.name = value;
      setTeams(copyTeams);
    };
  };

  return (
    <Box sx={teamContainerStyle}>
      {teams.map((team: TeamType) => (<TeamComponent key={`team-${team.id}`} id={team.id} value={team.name} changeTeamName={changeTeamName} teams={teams} />))}
    </Box>
  )
};

export default TeamsContainer;
