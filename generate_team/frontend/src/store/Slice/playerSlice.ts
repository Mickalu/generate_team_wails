import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerType } from "../../types/PlayerType";

interface playersSliceProps {
  players: PlayerType[]
}

const initialState: playersSliceProps = {
  players: []
};

interface changeUsernameProps {
  id: string;
  value: string;
};

interface changeLevelProps {
  id: string;
  value: number;
};

const resetPlayerStateFunc = () => initialState;

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    resetPlayersState: resetPlayerStateFunc,
    addPlayerState: (state, action: PayloadAction<PlayerType>) => {
      state.players = [...state.players, action.payload]
    },
    removePlayerState: (state, action: PayloadAction<{ id: string }>) => {
      const playersListCopy = [...state.players];
      const listFiltered = playersListCopy.filter((player) => player.id !== action.payload.id);
      state.players = listFiltered;
    },
    changePlayerUsernameState: (state, action: PayloadAction<changeUsernameProps>) => {
      const playersListCopy = [...state.players];
      const index = playersListCopy.map(player => player.id).indexOf(action.payload.id);
      const player = playersListCopy[index];

      player['username'] = action.payload.value;
      playersListCopy[index] = player;
      state.players = playersListCopy;
    },
    changePlayerLevelUserState: (state, action: PayloadAction<changeLevelProps>) => {
      const playersListCopy = [...state.players];
      const index = playersListCopy.map(player => player.id).indexOf(action.payload.id);
      const player = playersListCopy[index];

      player['level'] = action.payload.value;
      playersListCopy[index] = player;
      state.players = playersListCopy;
    },
  }
});

export default playersSlice.reducer;
export const {
  resetPlayersState,
  addPlayerState,
  removePlayerState,
  changePlayerUsernameState,
  changePlayerLevelUserState,
} = playersSlice.actions;
