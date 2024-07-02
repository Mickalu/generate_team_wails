import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TeamType from "../../types/TeamType";
import { PlayerType } from "../../types/PlayerType";

export interface teamResultProps {
  team: TeamType
  players: PlayerType[]
};

export interface initialStateProps {
  result: teamResultProps[]
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
  }
});

export default generatorResultSlice.reducer;
export const { resetGeneratorResult, initGeneratorResult } = generatorResultSlice.actions;
