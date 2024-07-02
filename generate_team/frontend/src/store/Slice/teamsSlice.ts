import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import TeamType from "../../types/TeamType";

interface initialStateProps {
  teams: TeamType[];
}

interface changeTeamNameProps {
  id: number
  value: string
}

const initialState: initialStateProps = {
  teams: [
    { name: "team 1", id: 1 },
    { name: "team 2", id: 2 },
  ],
}


const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    resetTeamsState: () => initialState,
    changeTeamNameState: (state, action: PayloadAction<changeTeamNameProps>) => {
      const copy = [...state.teams];
      const teamUpdate = copy.find(team => team.id === action.payload.id);

      if (teamUpdate) {
        teamUpdate.name = action.payload.value;
        state.teams = copy;
      }
    },
  }
});

export default teamsSlice.reducer;
export const { resetTeamsState, changeTeamNameState } = teamsSlice.actions;
