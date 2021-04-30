import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import gameDetails from "./gameDetail";

export default configureStore({
  reducer: {
    games: gamesReducer,
    gameDetails: gameDetails,
  },
});
