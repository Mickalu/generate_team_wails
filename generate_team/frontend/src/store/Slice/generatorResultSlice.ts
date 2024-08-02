import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TeamType from "../../types/TeamType";
import { PlayerResultType } from "../../types/PlayerType";
import { CleaningServices } from "@mui/icons-material";

export interface teamResultProps {
  team: TeamType
  players: PlayerResultType[]
};

export interface initialStateProps {
  result: teamResultProps[]
}

interface updateActivityProps {
  id: string;
}

const initialState: initialStateProps = {
  result: []
}

const generatorResultSlice = createSlice({
  name: 'generatorResult',
  initialState,
  reducers: {
    resetGeneratorResult: () => initialState,
    initGeneratorResult: (state, action: PayloadAction<teamResultProps[]>) => {
      state.result = action.payload;
    },
    updatePlayerActivity: (state, action:PayloadAction<updateActivityProps>) => {
      const copy = [...state.result];

      for (const [indexTeam, teamInfo] of state.result.entries()) {
        for (const [indexPlayer, player] of teamInfo.players.entries()) {
          if (player.id === action.payload.id) {
            copy[indexTeam].players[indexPlayer].isActive = !player.isActive;
          }
        }
        
      } 

      console.log("copy : ",  copy);
      state.result = copy;
    }
  }
});

export default generatorResultSlice.reducer;
export const { resetGeneratorResult, initGeneratorResult, updatePlayerActivity } = generatorResultSlice.actions;
