import { configureStore } from '@reduxjs/toolkit';
import playersReducer from "./Slice/playerSlice";
import teamsReducer from "./Slice/teamsSlice";
import generatorResultReducer from "./Slice/generatorResultSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    teams: teamsReducer,
    generatorResult: generatorResultReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
