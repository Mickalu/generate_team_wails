import React, { useEffect, useState } from 'react';
import TeamType from '../../types/TeamType';
import TeamComponent from '../../Components/TeamComponent/TeamComponent';
import { teamContainerStyle } from './styles';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeTeamNameState } from '../../store/Slice/teamsSlice';

const initTeams: TeamType[] = [
  { id: 1, name: 'Sombre' },
  { id: 2, name: 'Clair' },
];

const TeamsContainer = () => {
  const [teams, setTeams] = useState<TeamType[]>(initTeams);

  const teamsState = useAppSelector(state => state.teams.teams);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTeams(teamsState);
  }, [teamsState]);

  const changeTeamName = (value: TeamType['name'], id: TeamType['id']) => {
    dispatch(changeTeamNameState({ id: id, value: value }));
  };

  return (
    <Box sx={teamContainerStyle}>
      {teams.map((team: TeamType) => (<TeamComponent key={`team-${team.id}`} id={team.id} value={team.name} changeTeamName={changeTeamName} />))}
    </Box>
  )
};

export default TeamsContainer;
